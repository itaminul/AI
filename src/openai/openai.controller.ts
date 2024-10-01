import { Body, Controller, Post } from '@nestjs/common';
import { createChatCompletionRequest } from './dto/create-chat-completion.requiest';
import { OpenaiService } from './openai.service';

@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}
  @Post('chaCompletion')
  async createChatCompletion(@Body() body: createChatCompletionRequest) {
    return this.openaiService.createChatCompletion(body.messages);
  }
}
