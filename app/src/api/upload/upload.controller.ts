import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UploadService } from './upload.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags("upload")
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  
  @ApiOperation({ summary: '1. 고객정보 및 주문내역정보 업로드 API' })
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file) {
    return this.uploadService.uploadFile(file);
  }
}
