import {ImageDto} from "@app/product/dtos/image";

export interface ProductDetailsDto {
    id: number;
    priceGross: number;
    content: string;
    description: string;
    priceGrossBeforeDiscount: number;
    mainImage: ImageDto;
    name: string;
    model: string;
}
