import { HttpException, HttpStatus, Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  @Inject()
  private jwtService: JwtService;
  @Inject()
  private authService: AuthService;
  async use(req: any, res: any, next: () => void) {

    let header = req.headers['authorization'];
    if (header != null)
    {
      try
      {
        header = header.split('Bearer ')[1];
        let data = await this.jwtService.verifyAsync(header);
        if (await this.authService.validateUser(data))
        {
          req.user = data;
          next();
        }
        else
        {
          throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
      }
      catch (err)
      {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      }
    }
    else
    {
        throw new HttpException('No jwt in headers', HttpStatus.FORBIDDEN);
    }
  }
}
