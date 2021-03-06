import { HeroesComponent } from "./heroes.component";
import { of } from "rxjs";

describe("HeroesComponnent",()=>{
    let component: HeroesComponent;
    let HEROES;
    let mockHeroService;

    beforeEach(()=>{
        HEROES= [
            {id:1,name:'SpiderDude',strength:8},
            {id:2,name:'Wonderful Woman',strength:24},
            {id:3,name:'SuperDude',strength:55}
        ]
        
        mockHeroService = jasmine.createSpyObj(['addHero','deleteHero','getHeroes']);

        component = new HeroesComponent(mockHeroService);

    });

    describe('delete', () => {
        it ('should remove the indicated hero from hero lists', ()=>{
            //arrange
            mockHeroService.deleteHero.and.returnValue(of(true));
            component.heroes = HEROES;
            //act
            component.delete(HEROES[2]);
            //assert
            expect(component.heroes.length).toEqual(2);
        });

        it ("should call deleteHero",()=>{
            //arrange
            mockHeroService.deleteHero.and.returnValue(of(true));
            component.heroes = HEROES;
            //act
            component.delete(HEROES[2]);
            //assert
            expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
        });
    });

});