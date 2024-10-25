import { Controller } from '@nestjs/common';
import { InstagramProvider } from '../../providers/InstagramProvider';

@Controller('instagram')
export class InstagramController {
  constructor(private readonly instagramProvider: InstagramProvider) {}

  // Define routes and methods here
}