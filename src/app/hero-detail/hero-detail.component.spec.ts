import { TestBed, ComponentFixture } from "@angular/core/testing";
import { HeroDetailComponent } from "./hero-detail.component";
import { HeroService } from "../hero.service";
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { of } from "rxjs";
import { FormsModule } from "@angular/forms";
import { timeout } from "rxjs/operators";

describe('HeroDetailComponent',()=>{
    let mockLocation, mockHeroService,mockActivatedRoute;
    let fixture : ComponentFixture<HeroDetailComponent>;
    beforeEach(() =>{
        mockActivatedRoute = {
            snapshot:{ paramMap: { get: ()=> {return '3'}}}
        }
        mockLocation = jasmine.createSpyObj(['back']);
        mockHeroService = jasmine.createSpyObj(['getHero','updateHero']);

        TestBed.configureTestingModule({
            declarations:[HeroDetailComponent],
            imports:[FormsModule],
            providers:[
                {provide: Location, useValue: mockLocation},
                {provide: HeroService, useValue: mockHeroService},
                {provide: ActivatedRoute, useValue: mockActivatedRoute},
            ]
        });

        fixture = TestBed.createComponent(HeroDetailComponent);

        mockHeroService.getHero.and.returnValue(of(
            {id: 3, name: 'SuperDude', strength:100}
        ))
     
    });

    it('Should render hero name in a h2 tag',()=>{
      
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SuperDude'.toUpperCase());
    });

    it('should call updateHero when save is called',(done)=>{

        mockHeroService.updateHero.and.returnValue(of({}));
        fixture.detectChanges();

        fixture.componentInstance.save();
        setTimeout(()=>{
             expect(mockHeroService.updateHero).toHaveBeenCalled();
             done();
        }, 300);
    });
});