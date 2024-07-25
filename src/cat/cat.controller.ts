import { Body, Controller, Get, Header, HttpCode, HttpException, Inject, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateCatDto } from './dao/CreateCatDto';
import { CatsService } from './cat.service';
import { Cat } from './interface/cat.interface';
import { UserNotExist } from 'src/common/exception/customException';

//@Controller('cats')
@Controller({ path: 'cats' }) //指定controller请求路径，两种方式都可以
export class CatController {

  constructor(private catsService: CatsService) {}
  // @Inject('CatsService')
  // private readonly catsService: CatsService

  @Get("/exceptionTest")
  async testException() {
    throw new HttpException("123", 200, {cause: new Error("123456"),description: "123qqq"})
  }

  @Get("/exceptionTest1")
  async testException1() {
    let v = new UserNotExist
    console.log(v.cause)
    throw new UserNotExist()
  }

  @Post("creat2")
  async create2(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get("find1")
  async findAll1(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get()
  findAll(@Req() request: Request): string {
    return 'This action returns all cats'
  }

  @Post()
  @HttpCode(200) //自定义成功状态码
  @Header("myheader", "haha") //自定义返回头
  create(): string {
    return 'This action adds a new cat'
  }

  @Get(':id') //url中附带参数
  findOne(@Param() params: any): string {
    console.log(params.id)
    return `This action returns a #${params.id} cat`
  }

  @Post("create1")
  //异步函数在进行io操作发生等待时，会把线程资源释放给其他任务使用；而同步方法会一直占用线程
  async create1(@Body() createCatDto: CreateCatDto) { //获取请求体中的内容
    console.log(createCatDto.name)
    return new CreateCatDto("123",11,"dfsf")
  }
}
