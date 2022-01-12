/*
 * ONE IDENTITY LLC. PROPRIETARY INFORMATION
 *
 * This software is confidential.  One Identity, LLC. or one of its affiliates or
 * subsidiaries, has supplied this software to you under terms of a
 * license agreement, nondisclosure agreement or both.
 *
 * You may not copy, disclose, or use this software except in accordance with
 * those terms.
 *
 *
 * Copyright 2021 One Identity LLC.
 * ALL RIGHTS RESERVED.
 *
 * ONE IDENTITY LLC. MAKES NO REPRESENTATIONS OR
 * WARRANTIES ABOUT THE SUITABILITY OF THE SOFTWARE,
 * EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
 * TO THE IMPLIED WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE, OR
 * NON-INFRINGEMENT.  ONE IDENTITY LLC. SHALL NOT BE
 * LIABLE FOR ANY DAMAGES SUFFERED BY LICENSEE
 * AS A RESULT OF USING, MODIFYING OR DISTRIBUTING
 * THIS SOFTWARE OR ITS DERIVATIVES.
 *
 */


import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { EuiSidesheetService, EUI_SIDESHEET_DATA } from '@elemental-ui/core';
import { of } from 'rxjs';

import { ClassloggerService } from 'qbm';

import { PickCategorySidesheetComponent } from './pick-category-sidesheet.component';
import { PickCategoryService } from '../pick-category.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IClientProperty } from 'imx-qbm-dbts';

describe('PickCategorySidesheetComponent', () => {
  let component: PickCategorySidesheetComponent;
  let fixture: ComponentFixture<PickCategorySidesheetComponent>;

  const sidesheetData = {
    pickCategory: {
      GetEntity: () => ({
        GetKeys: () => ['123'],
        GetDisplayLong: () => 'longDisplay',
        GetColumn: () => ({ GetValue: () => ({}) }),
      }),
    },
    isNew: false
  };

  let result: any;
  const matDialogStub = {
    open: jasmine.createSpy('open').and.returnValue({ afterClosed: () => of(result) }),
    closeAll: jasmine.createSpy('closeAll')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PickCategorySidesheetComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        {
          provide: EUI_SIDESHEET_DATA,
          useValue: sidesheetData,
        },
        {
          provide: EuiSidesheetService,
          useValue: {}
        },
        {
          provide: MatDialog,
          useValue: matDialogStub
        },
        {
          provide: ClassloggerService,
          useValue: {
            debug: jasmine.createSpy('debug').and.callThrough(),
            trace: jasmine.createSpy('trace').and.callThrough()
          }
        },
        {
          provide: PickCategoryService,
          useValue: {
            pickcategoryItemsSchema: { Columns: { __Display: { ColumnName: '__Display' } as IClientProperty } },
            deletePickCategoryItems: jasmine.createSpy('deletePickCategoryItems').and.returnValue({}),
            getPickCategoryItems: jasmine.createSpy('getPickCategoryItems').and.returnValue({}),
            handleOpenLoader: jasmine.createSpy('handleOpenLoader').and.callThrough(),
            handleCloseLoader: jasmine.createSpy('handleCloseLoader').and.callThrough()
          }
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickCategorySidesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});