output "api_url" {
  description = "API Gateway URL"
  value       = "${aws_apigatewayv2_stage.portfolio.invoke_url}/api/ask"
}

output "ecr_repository_url" {
  description = "ECR repository URL for Docker image"
  value       = aws_ecr_repository.portfolio.repository_url
}
