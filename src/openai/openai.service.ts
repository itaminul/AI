import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ChatCompletionMessageDto } from './dto/create-chat-completion.requiest';
import { ChatCompletionMessageParam } from 'openai/resources';

@Injectable()
export class OpenaiService {
  constructor(private readonly openai: OpenAI) {}

  async createChatCompletion(messages: ChatCompletionMessageDto[]) {
    try {
      return this.openai.chat.completions.create({
        messages: messages as ChatCompletionMessageParam[],
        model: 'gpt-3.5-turbo',
      });
    } catch (error) {
      if (error.response?.status === 429) {
        console.error('Rate limit hit, retrying...');
      } else {
        throw new HttpException(
          'Error communicating with OpenAI API',
          HttpStatus.BAD_GATEWAY,
        );
      }
    }
  }
}

/*

import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ChatCompletionMessageDto } from './dto/create-chat-completion.requiest';
import { ChatCompletionMessageParam } from 'openai/resources';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class OpenaiService {
    private client: OpenAI;

    constructor(private configService: ConfigService) {
      const apiKey = this.configService.get<string>('OPENAI_API_KEY');
      if (!apiKey) {
        throw new Error('OPENAI_API_KEY is missing or empty');
      }
  
      this.client = new OpenAI({ apiKey });
    }

  async createChatCompletion(messages: ChatCompletionMessageDto[]) {

    const response = await this.client.chat.completions.create({
        messages: [{ role: 'user', content: 'Say this is a test' }],
        model: 'gpt-3',  // Ensure valid model name
      });
  
      return response;
    
  }
}

*/
