import { Injectable } from '@nestjs/common';
import { getString } from "../../../shared/utils";

@Injectable()
export class AppService {
  getHello(): string {
    return getString("API");
  }
}
