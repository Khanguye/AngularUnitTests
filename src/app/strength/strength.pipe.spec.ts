import { StrengthPipe } from "./strength.pipe";

describe("StrengPipe", ()=>{

    it('should display weak if strength is 5', ()=>{
        //Arrange
        let pipe = new StrengthPipe();
        //Act
        let value = pipe.transform(5);
        //Assert
        expect(value).toEqual("5 (weak)");
    });

    it('should display strong if strength is 10', ()=>{
        //Arrange
        let pipe = new StrengthPipe();
        //Act
        let value = pipe.transform(10);
        //Assert
        expect(value).toEqual("10 (strong)");
    });

    it('should display unbelievable if strength is 20', ()=>{
        //Arrange
        let pipe = new StrengthPipe();
        //Act
        let value = pipe.transform(20);
        //Assert
        expect(value).toEqual("20 (unbelievable)");
    });
})