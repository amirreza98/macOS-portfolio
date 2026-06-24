terraform {
  backend "s3" {
    bucket = "portfolio-terraform-state-629542569012"
    key    = "portfolio/terraform.tfstate"
    region = "us-east-1"
  }
}

provider "aws" {
  region = var.aws_region
}

# ECR repository to store Lambda Docker image
resource "aws_ecr_repository" "portfolio" {
  name                 = "portfolio-lambda"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}

# IAM role for Lambda
resource "aws_iam_role" "lambda_role" {
  name = "portfolio-lambda-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action    = "sts:AssumeRole"
      Effect    = "Allow"
      Principal = {
        Service = "lambda.amazonaws.com"
      }
    }]
  })
}

# attach basic Lambda execution policy
resource "aws_iam_role_policy_attachment" "lambda_basic" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# Lambda function
resource "aws_lambda_function" "portfolio" {
  function_name = "portfolio-ask"
  package_type  = "Image"
  image_uri     = "${aws_ecr_repository.portfolio.repository_url}:latest"
  role          = aws_iam_role.lambda_role.arn
  timeout       = 30
  memory_size   = 256

  environment {
    variables = {
      OPENAI_API_KEY = var.openai_api_key
    }
  }
}

# API Gateway
resource "aws_apigatewayv2_api" "portfolio" {
  name          = "portfolio-api"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = ["https://azemati.netlify.app"]
    allow_methods = ["POST", "OPTIONS"]
    allow_headers = ["Content-Type"]
  }
}

resource "aws_apigatewayv2_integration" "portfolio" {
  api_id                 = aws_apigatewayv2_api.portfolio.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.portfolio.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "portfolio" {
  api_id    = aws_apigatewayv2_api.portfolio.id
  route_key = "POST /api/ask"
  target    = "integrations/${aws_apigatewayv2_integration.portfolio.id}"
}

resource "aws_apigatewayv2_stage" "portfolio" {
  api_id      = aws_apigatewayv2_api.portfolio.id
  name        = "$default"
  auto_deploy = true
}

# allow API Gateway to invoke Lambda
resource "aws_lambda_permission" "portfolio" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.portfolio.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.portfolio.execution_arn}/*/*"
}
