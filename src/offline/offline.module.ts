import {NgModule} from "@angular/core";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DatasourceComponent} from "./ds.component";
import {WorkflowComponent} from "./workflow.component";
import {OfflineRoutingModule} from "./offline-routing.module";
import {OffileIndexComponent} from "./offline.index.component";
import {DbAddComponent} from "./db.add.component";
import {TableAddComponent} from "./table.add.component";
import {TableAddStep1Component} from "./table.add.step1.component";
import {TableAddStep2Component} from "./table.add.step2.component";
import {GitCommitDiffComponent} from "./git.commit.diff.component";
import {WorkflowAddComponent} from "./workflow.add.component";
import {NzTabsModule} from 'ng-zorro-antd/tabs';
import {NzStatisticModule} from 'ng-zorro-antd/statistic';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzEmptyModule} from 'ng-zorro-antd/empty';

// import {TreeModule} from "angular-tree-component";
import {TisCommonModule} from "../common/common.module";
// import {WorkflowChangeCreateComponent} from "./workflow.change.create.component";
// import {SidebarModule} from 'ng-sidebar';

import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzDrawerModule} from 'ng-zorro-antd/drawer';
import {NzCascaderModule} from 'ng-zorro-antd/cascader';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {WorkflowAddDbtableSetterComponent} from "./workflow.add.dbtable.setter.component";
import {BasiManageModule} from "../base/base.manage.module";
import {NzSelectModule} from 'ng-zorro-antd/select';
import {WorkflowAddJoinComponent} from "./workflow.add.join.component";
import {WorkflowAddUnionComponent} from "./workflow.add.union.component";
import {WorkflowAddNestComponent} from "./workflow.add.nest.component";
import {NzTreeModule} from 'ng-zorro-antd/tree';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzDescriptionsModule} from 'ng-zorro-antd/descriptions';
import {NzNotificationModule} from 'ng-zorro-antd/notification';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {SideBarToolBar} from "../common/basic.form.component";
import {NZ_ICON_DEFAULT_TWOTONE_COLOR, NZ_ICONS, NzIconModule} from 'ng-zorro-antd/icon';

import {TISService} from "../service/tis.service";

import {NzCollapseModule} from 'ng-zorro-antd/collapse';
import {WorkflowERComponent} from "./workflow.er.component";
import {WorkflowAddErCardinalityComponent} from "./workflow.add.er.cardinality.component";
import {IconDefinition} from "@ant-design/icons-angular";
import {DeleteOutline} from "@ant-design/icons-angular/icons";
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {NzRadioModule} from 'ng-zorro-antd/radio';
import {WorkflowAddErMetaComponent} from "./workflow.add.er.meta.component";
import {NzSwitchModule} from 'ng-zorro-antd/switch';

const icons: IconDefinition[] = [DeleteOutline];

@NgModule({
  id: 'offline',
  imports: [ // CommonModule,
    NzCollapseModule,
    NzTabsModule, NzEmptyModule,
    NzInputModule, NzDropDownModule, NzIconModule, NzTableModule, NzRadioModule, NzSwitchModule,
    FormsModule, NgbModule, BasiManageModule, NzTreeModule, NzLayoutModule, NzDescriptionsModule
    , OfflineRoutingModule, // TreeModule,
    TisCommonModule, NzButtonModule, NzDrawerModule, NzCascaderModule
    , CommonModule, NzFormModule, NzSelectModule, NzModalModule, ReactiveFormsModule, NzNotificationModule
    , NzDividerModule, NzStatisticModule, NzGridModule, NzCheckboxModule
  ],
  providers: [
    {provide: NZ_ICON_DEFAULT_TWOTONE_COLOR, useValue: '#00ff00'}, // 不提供的话，即为 Ant Design 的主题蓝色
    {provide: NZ_ICONS, useValue: icons}
  ],
  declarations: [
    WorkflowComponent, SideBarToolBar, DatasourceComponent, OffileIndexComponent, DbAddComponent, WorkflowAddErMetaComponent
    , TableAddComponent, TableAddStep1Component, TableAddStep2Component,
    GitCommitDiffComponent,
    WorkflowAddComponent,
    WorkflowAddDbtableSetterComponent, WorkflowAddJoinComponent, WorkflowAddUnionComponent
    // tslint:disable-next-line:whitespace
    , WorkflowAddNestComponent, WorkflowERComponent, WorkflowAddErCardinalityComponent
  ],
  entryComponents: [WorkflowComponent, DatasourceComponent, OffileIndexComponent, DbAddComponent, TableAddComponent, WorkflowAddErMetaComponent
    , GitCommitDiffComponent, WorkflowAddComponent,
     WorkflowAddDbtableSetterComponent, WorkflowAddJoinComponent, WorkflowAddUnionComponent
    , WorkflowAddNestComponent, WorkflowAddErCardinalityComponent
  ],
  // providers: [TISService,ScriptService]
})
export class OfflineModule {
}