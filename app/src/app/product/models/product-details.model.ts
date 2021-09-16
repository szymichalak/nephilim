class ImageModel {
    public hqUrl: string;
    public iconUlr: string;
    public id: number;
    public sourceUrl: string;
}

export class ProductDetailsModel {

    public id: number;
    public priceGross: number;
    public content: string;
    public description: string;
    public priceGrossBeforeDiscount: number;
    public mainImage: ImageModel;
    public name: string;
    public model: string;

    constructor() { }

}
