import { MessageService } from "./message.service";

describe("MessageService", ()=> {
    let service : MessageService;

    beforeEach(()=>{
        service = new MessageService();
    });

    it("Should have no message to start",() => {
        //arrange
        service = new MessageService();
        //assert
        expect(service.messages.length).toBe(0);
    });

    it("Should add a message when add is called",() => {
        //arrange
        service = new MessageService();
        //act
        service.add("message1");
        //assert
        expect(service.messages.length).toBe(1);
    });

    it("Should remove all messages when add is called",() => {
        //arrange
        service = new MessageService();
        service.add("message1");
        //act
        service.clear();
        //assert
        expect(service.messages.length).toBe(0);
    });
});