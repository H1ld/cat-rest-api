import { Injectable } from '@nestjs/common';


// Default Service file
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
