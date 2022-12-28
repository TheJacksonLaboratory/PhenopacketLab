import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectButtonModule } from 'primeng/selectbutton';

import { ProfileSelectionComponent } from './profile-selection.component';

describe('ProfileSelectionComponent', () => {
    let component: ProfileSelectionComponent;
    let fixture: ComponentFixture<ProfileSelectionComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ProfileSelectionComponent],
            imports: [
                SelectButtonModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileSelectionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
