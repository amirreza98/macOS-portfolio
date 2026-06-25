import { handler } from './src/handler.js'; 

// Simulate a Lambda event
const fakeEvent = {
  requestContext: {
    http: {
      method: 'POST',
      sourceIp: '127.0.0.1'
    }
  },
  body: JSON.stringify({
    question: "What is Amir's tech stack?"
  })
};

const result = await handler(fakeEvent);
console.log('Status:', result.statusCode);
console.log('Body:', JSON.parse(result.body));