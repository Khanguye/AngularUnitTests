import { TestBed } from "@angular/core/testing"
import { HeroService } from "./hero.service"
import { MessageService } from "./message.service"
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
describe('Hero Service',()=>{
    let mockMessageService;
    let httpTestingController: HttpTestingController;
    let service: HeroService;
    beforeEach(()=>{
        mockMessageService = jasmine.createSpyObj(['add']);
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers:[
                HeroService,
                {provide: MessageService, useValue: mockMessageService}
            ]
        });

        httpTestingController = TestBed.get(HttpTestingController);
        service = TestBed.get(HeroService);
  
    })
    
    describe('getHero',() =>{
        //inject([HeroService,HttpTestingController],(service: HeroService, controller:HttpTestingController))
        it('should call get with the correct URL',()=>{
            service.getHero(4).subscribe();

            //call only one
            // request
            const req = httpTestingController.expectOne('api/heroes/4');
            // response
            req.flush({id:4,name:'SuperDude',strength: 100});
            //get expect what we want
            httpTestingController.verify();
        })
    })
})