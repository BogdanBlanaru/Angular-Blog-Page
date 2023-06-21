import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RegisterContainerComponent } from './container.component'

describe( 'ContainerComponent', () => {
  let component: RegisterContainerComponent
  let fixture: ComponentFixture<RegisterContainerComponent>

  beforeEach( () => {
    TestBed.configureTestingModule( {
      declarations: [ RegisterContainerComponent ]
    } )
    fixture = TestBed.createComponent( RegisterContainerComponent )
    component = fixture.componentInstance
    fixture.detectChanges()
  } )

  it( 'should create', () => {
    expect( component ).toBeTruthy()
  } )
} )
