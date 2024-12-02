import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Жизненный цикл приложения')
@Controller('health')
export class HealthController {
  @ApiOperation({ summary: 'Проверка работоспособности приложения' })
  @Get()
  checkHealth(): string {
    return 'Привет, я работаю!';
  }
}
