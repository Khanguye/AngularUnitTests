import { ComponentFixture, TestBed } from "@angular/core/testing"
import { HeroesComponent } from "./heroes.component"
import { NO_ERRORS_SCHEMA, Input, Component } from "@angular/core";
import { HeroService } from "../hero.service";
import { of } from "rxjs";
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "../hero/hero.component";
import { forEach } from "@angular/router/src/utils/collection";
import { by } from "protractor";
import { findLocaleData } from "@angular/common/src/i18n/locale_data_api";

describe("heroesComponent (Deep Tests)",()=>{
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;
    
    beforeEach(()=>{
        HEROES= [
            {id:1,name:'SpiderDude',strength:8},
            {id:2,name:'Wonderful Woman',strength:24},
            {id:3,name:'SuperDude',strength:55}
        ]
        mockHeroService = jasmine.createSpyObj(['getHeroes','addHero','deleteHero']);

        TestBed.configureTestingModule({
            declarations:[
                HeroesComponent,
                HeroComponent
            ],
            providers:[
                {
                    provide: HeroService, useValue: mockHeroService
                }
            ],
            schemas:[NO_ERRORS_SCHEMA]
        });

        fixture = TestBed.createComponent(HeroesComponent);

        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        fixture.detectChanges();
    });

   it('should render each hero as a HeroComponent',()=>{
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        
        // run ngOnInit
        fixture.detectChanges();

        const heroComps = fixture.debugElement.queryAll(By.directive(HeroComponent))

        expect(heroComps.length).toEqual(3);
        
        for(let i=0;i< heroComps.length; i++){
            expect(heroComps[i].componentInstance.hero).toEqual(HEROES[i]);
        }
   });

   it(`Should call heroService.deleteHero 
   when the Hero component's delete button is clicked`,()=>{

    spyOn(fixture.componentInstance,'delete');

    mockHeroService.getHeroes.and.returnValue(of(HEROES));
        
    // run ngOnInit
    fixture.detectChanges();

    const heroesComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
    //UI Click event
    // heroesComponents[0].query(By.css('button'))
    //     .triggerEventHandler('click', {stopPropagation:()=>{}});
    //Raise Event with Child Base Class
    //(<HeroComponent>heroesComponents[0].componentInstance).delete.emit(undefined);
    //Raise Event on Children Directive
    heroesComponents[0].triggerEventHandler('delete',null);

    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
   });


})