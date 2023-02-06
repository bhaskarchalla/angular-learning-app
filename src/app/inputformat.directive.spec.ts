import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { InputformatDirective } from './inputformat.directive';

// Not yet completed
describe('InputformatDirective', () => {
  let fixture:  ComponentFixture<AppComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        InputformatDirective,
      ]
    });
  });
  it('should be able to test directive', async(() => {
    TestBed.overrideComponent(AppComponent, {
      set: {
        template: '<div my-directive></div>'
      }
    });
    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const directiveEl = fixture.debugElement.query(By.directive(InputformatDirective));
      expect(directiveEl).not.toBeNull();

      const directiveInstance = directiveEl.injector.get(InputformatDirective);
      expect(directiveInstance.inputformater('fadsf','US')).toBe('hi!');
    });
  }));
  // it('should create an instance', () => {
  //   const directive = new InputformatDirective();
  //   expect(directive).toBeTruthy();
  // });
});
