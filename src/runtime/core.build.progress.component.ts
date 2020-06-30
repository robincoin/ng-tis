import {AppFormComponent, CurrentCollection} from "../common/basic.form.component";
import {ActivatedRoute, Params} from "@angular/router";
import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, TemplateRef, ViewChild} from "@angular/core";
import {TISService} from "../service/tis.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

import {NgTerminal} from "ng-terminal";
import {NzDrawerRef, NzDrawerService} from "ng-zorro-antd";
import {Observable, Subject} from "rxjs";


@Component({
  selector: 'tis-progress',
  template: `
      <dd class="progress">
          <div *ngIf="t.success" class="progress-bar bg-success" role="progressbar" aria-valuenow="100"
               style="width: 100%" aria-valuemin="0" aria-valuemax="100">100%
          </div>
          <div *ngIf="!t.waiting && !t.complete" class="progress-bar" role="progressbar" [attr.aria-valuenow]="t.percent"
               [ngStyle]="{'width': t.percent+'%'}" aria-valuemin="0" aria-valuemax="100">
              {{t.percent}}%({{t.processed}}/{{t.all}})
          </div>
          <div *ngIf="t.waiting" class="progress-bar bg-warning" role="progressbar"
               style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">等待
          </div>
          <div *ngIf="t.faild" class="progress-bar bg-danger" role="progressbar"
               style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">失败
          </div>
      </dd>
  `
})
export class ProgressComponent {
  t: any = {};

  @Input() set val(val: any) {
    this.t = val;
  }
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tis-progress-title',
  template: `
      <h6 class="card-title">
      <span *ngIf="t.success" class="badge badge-pill badge-success">
        <i class="fa fa-check"
           aria-hidden="true"></i>成功</span>
          <span *ngIf="t.faild" class="badge badge-pill badge-danger">
        <i class="fa fa-times"
           aria-hidden="true"></i>失败</span>
          <i *ngIf="t.processing" class="fa fa-cog fa-spin fa-1x fa-fw"></i>
          <ng-content></ng-content>
      </h6>  `
})
export class ProgressTitleComponent {
  t: any = {};

  @Input() set val(val: any) {
    // console.log(val);
    this.t = val;
  }
}


/**
 * 全量构建索引可视化页面
 * Created by baisui on 2017/7/12 0012.
 */


@Component({
  template: `
      <!--
      <button (click)="triggerFullBuild()">触发全量构建</button>
      back="../../full_build_history"
       -->
      <tis-page-header title="构建状态" [breadcrumb]="this.breadcrumb" [showBreadcrumbRoot]="appNotAware" [showBreadcrumb]="true">
          <button nz-button (click)="openReltimeLog()">实时日志</button>
      </tis-page-header>

      <nz-spin [nzSpinning]="isSpinning" [nzDelay]="1000" nzSize="large">
          <nz-collapse [nzBordered]="false">
              <nz-collapse-panel *ngIf="this.buildTask.inRange(1)" [nzHeader]="dumpTpl" [nzActive]="true">
                  <ul class='child-block' *ngIf="liveExecLog.dumpPhase">
                      <li *ngFor="let t of liveExecLog.dumpPhase.processStatus.details;">
                          <dt>{{t.name}}</dt>
                          <tis-progress [val]="t"></tis-progress>
                      </li>
                  </ul>
              </nz-collapse-panel>
              <ng-template #dumpTpl>
                  <tis-progress-title [val]="liveExecLog.dumpPhase">数据导入</tis-progress-title>
              </ng-template>

              <nz-collapse-panel *ngIf="this.buildTask.inRange(2)" [nzHeader]="joinTpl" [nzActive]="true">
                  <ul class='child-block' *ngIf="liveExecLog.joinPhase">
                      <li *ngFor="let t of liveExecLog.joinPhase.processStatus.details;">
                          <dt>{{t.name}}</dt>
                          <tis-progress [val]="t"></tis-progress>
                      </li>
                  </ul>
              </nz-collapse-panel>
              <ng-template #joinTpl>
                  <tis-progress-title [val]="liveExecLog.joinPhase">宽表构建</tis-progress-title>
              </ng-template>


              <nz-collapse-panel *ngIf="this.buildTask.inRange(3)" [nzHeader]="indexBuildTpl" [nzActive]="true">
                  <ul class='child-block' *ngIf="liveExecLog.buildPhase">
                      <li *ngFor="let t of liveExecLog.buildPhase.details;">
                          <dt>{{t.name}}</dt>
                          <tis-progress [val]="t"></tis-progress>
                      </li>
                  </ul>
              </nz-collapse-panel>
              <ng-template #indexBuildTpl>
                  <tis-progress-title [val]="liveExecLog.buildPhase">倒排索引构建</tis-progress-title>
              </ng-template>


              <nz-collapse-panel *ngIf="this.buildTask.inRange(4)" [nzHeader]="indexBackFlow" [nzActive]="true">
                  <ul class='child-block' *ngIf="liveExecLog.indexBackFlowPhaseStatus">
                      <li *ngFor="let t of liveExecLog.indexBackFlowPhaseStatus.details;">
                          <dt>{{t.name}}</dt>
                          <tis-progress [val]="t"></tis-progress>
                      </li>
                  </ul>
              </nz-collapse-panel>
              <ng-template #indexBackFlow>
                  <tis-progress-title [val]="liveExecLog.indexBackFlowPhaseStatus">索引回流</tis-progress-title>
              </ng-template>

          </nz-collapse>
      </nz-spin>
      <nz-drawer
              [nzBodyStyle]="{ height: 'calc(100% - 55px)', overflow: 'auto', 'padding-bottom': '53px' }"
              [nzMaskClosable]="false"
              [nzWidth]="'70%'"
              [nzVisible]="termVisible"
              nzTitle="执行日志"
              (nzOnClose)="termClose()"
      >
          <ng-terminal #term></ng-terminal>
      </nz-drawer>

  `,
  styles: [
      `
          .child-block {
              list-style-type: none;
          }

          .child-block li {
              display: block;
              width: 25%;
              float: left;
              padding-right: 8px;
          }

          .layout {
              height: 80vh;
          }
    `
  ]
})
export class BuildProgressComponent extends AppFormComponent implements AfterViewInit {

  @ViewChild('termTemplate', {static: false}) termTemplate: TemplateRef<{
    $implicit: { value: string };
    drawerRef: NzDrawerRef<string>;
  }>;
  breadcrumb: string[];
  @ViewChild('term', {static: true}) terminal: NgTerminal;
  buildTask = new BuildTask();

  private msgSubject: Subject<WSMessage>;

// http://localhost:8080/coredefine/corenodemanage.ajax?action=core_action&emethod=get_view_data
//   app: any;
//   config: any;
//   instanceDirDesc: any;
  @ViewChild('term', {static: true}) child: NgTerminal;
  value = 'ng';
  liveExecLog: any = {
    "buildPhase": {
      "processStatus": {
        "details": [],
        "processPercent": 0
      },
      "success": false,
      "complete": false
    },
    "joinPhase": {
      "processStatus": {
        "details": [],
        "processPercent": 0
      },
      "success": false,
      "complete": false
    },
    "dumpPhase": {
      "processStatus": {
        "details": [],
        "processPercent": 0
      },
      "success": false,
      "complete": false
    },
    "indexBackFlowPhaseStatus": {
      "processStatus": {
        "details": [],
        "processPercent": 0
      },
      "success": false,
      "complete": false,
    }
  };
  isSpinning = false;
  termVisible = false;

  // private count: number = 1;
  constructor(tisService: TISService, modalService: NgbModal
    , route: ActivatedRoute, private cd: ChangeDetectorRef) {
    super(tisService, route, modalService);
    // ng-terminal说明文档
    // https://ng.ant.design/docs/introduce/zh
    this.cd.detach();
  }


  ngAfterViewInit(): void {
    // this.invalidate();
    // this.child.keyEventInput.subscribe( e => {
    //   console.log('keyboard event:' + e.domEvent.keyCode + ', ' + e.key);
    //
    //   const ev = e.domEvent;
    //   const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;
    //
    //   if (ev.keyCode === 13) {
    //     this.child.write('\r\n$ ');
    //   } else if (ev.keyCode === 8) {
    //     // Do not delete the prompt
    //     if (this.child.underlying.buffer.cursorX > 2) {
    //       this.child.write('\b \b');
    //     }
    //   } else if (printable) {
    //     this.child.write(e.key);
    //   }
    // });
  }

  ngOnInit(): void {
    // this.isSpinning = true;
    // super.ngOnInit();
    this.route.params
      .subscribe((params: Params) => {
        let taskid: number = parseInt(params['taskid'], 10);

        let wfid = params['wfid'];
        if (wfid) {
          this.httpPost('/coredefine/full_build_history.ajax'
            , `emethod=get_workflow&action=core_action&wfid=${wfid}&taskid=${taskid}`).then((r) => {
            let wf = r.bizresult.workflow;
            this.buildTask = Object.assign(new BuildTask(), r.bizresult.task);
            if (this.appNotAware) {
              this.breadcrumb = ['数据流', '/offline/wf', wf.name, `/offline/wf_update/${wf.name}`, '构建历史', `../`];
            } else {
              this.breadcrumb = ['构建历史', `../`];
            }
            this.cd.reattach();
          });
        } else {
          this.cd.reattach();
        }

        this.receiveTriggerFullBuildLog(taskid);
      });
  }

  // 触发全量索引构建
  public receiveTriggerFullBuildLog(taskid: number): void {
    // 服务端生成了taskid
    this.msgSubject = <Subject<WSMessage>>this.tisService.wsconnect(`ws://${window.location.host}/tjs/download/logfeedback?taskid=${taskid}&logtype=build_status_metrics`)
      .map((response: MessageEvent): WSMessage => {
        return new WSMessage('build_status_metrics', JSON.parse(response.data));
      });
    this.msgSubject.subscribe((response: WSMessage): void => {

      switch (response.logtype) {
        case "build_status_metrics":
          let status = response.data;
          // console.log(status);
          // console.info(status.dumpPhase);
          this.liveExecLog.dumpPhase = status.dumpPhase;
          this.liveExecLog.joinPhase = status.joinPhase;
          this.liveExecLog.buildPhase = status.buildPhase;
          this.liveExecLog.indexBackFlowPhaseStatus
            = status.indexBackFlowPhaseStatus;
          break;
        case "full":
          console.log(response.data );
          break;
        default:
          throw new Error(`logttype:${response.logtype} is illegal`);
      }
      if (this.isSpinning) {
        this.isSpinning = false;
      }
    });
  }


  public stringify(o: any): string {
    return JSON.stringify(o);
  }

  protected initialize(app: CurrentCollection): void {
    // this.httpPost('/coredefine/corenodemanage.ajax?action=core_action&emethod=get_view_data', '')
    //   .then((r) => {
    //     if (r.success) {
    //       this.app = r.bizresult.app;
    //       this.config = r.bizresult.config;
    //       this.instanceDirDesc = r.bizresult.instanceDirDesc;
    //     }
    //   });
  }


  openReltimeLog() {
    this.termVisible = true;
    this.msgSubject.next(new WSMessage("full"));
    // this.tisService.wsconnect(`ws://${window.location.host}/tjs/download/logfeedback?taskid=${taskid}&logtype=full`)
    //   .subscribe((response: MessageEvent): void => {});
  }

  termClose() {
    this.termVisible = false;
  }
}

class WSMessage {
  constructor(public logtype: string, public data?: any) {

  }
}

class BuildTask {
  id: number;
  createTime: number;
  startPhase: number;
  endPhase: number;
  triggerType: number;

  inRange(phase: number): boolean {
    return phase >= this.startPhase && phase <= this.endPhase;
  }
}