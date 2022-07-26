import { Request, Response } from "express";
import { ReceiptAccountUsecase } from "./ReceiptAccountUsecase";


export class ReceiptAccountController {
  async handle(request: Request, response: Response) {
    const { account_id } = request;

    const service = new ReceiptAccountUsecase();

    const receipts = await service.execute(account_id);

    return response.status(200).json(receipts);
  }
}