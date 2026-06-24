variable "aws_region" {
  description = "AWS region"
  default     = "us-east-1"
}

variable "openai_api_key" {
  description = "OpenAI API key"
  sensitive   = true
}
