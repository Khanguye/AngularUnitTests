import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { NO_ERRORS_SCHEMA, Component, Input, Directive } from "@angular/core";
import { HeroService } from "../hero.service";
import { of } from "rxjs";
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "../hero/hero.component";
//stub directive
@Directive({
  selector: '[routerLink]',//[] make it an attribute selector
  host: { '(click)': 'onClick()' }  //The @HostListener decorator lets you subscribe to events of the DOM element that hosts an attribute directive
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

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
                HeroComponent,
                RouterLinkDirectiveStub
            ],
            providers:[
                {
                    provide: HeroService, useValue: mockHeroService
                }
            ],
            //schemas:[NO_ERRORS_SCHEMA]
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

   it('should add a new hero to the hero list when add button is clicked',()=>{

    mockHeroService.getHeroes.and.returnValue(of(HEROES));
   
    // run ngOnInit
    fixture.detectChanges();

    const name = "Mr. Hero";
    mockHeroService.addHero.and.returnValue(of({id:5,name: name,strength:4}));
    //get the input and set Value
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    inputElement.value = name;

    const addButton = fixture.debugElement.queryAll(By.css('button'))[0];
    addButton.triggerEventHandler('click',null);

    fixture.detectChanges();

    const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;

    expect(heroText).toContain(name);

    });

    it('should have the correct route for the first hero',()=>{
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
           // run ngOnInit
        fixture.detectChanges();

        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

        let routerLink = heroComponents[0]
        .query(By.directive(RouterLinkDirectiveStub))
        .injector.get(RouterLinkDirectiveStub);

        heroComponents[0].query(By.css('a')).triggerEventHandler('click',null);

        expect(routerLink.navigatedTo).toBe('/detail/1');
    })

})