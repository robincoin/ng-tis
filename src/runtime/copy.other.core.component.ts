/**
 * Created by baisui on 2017/3/29 0029.
 */
import {Component} from '@angular/core';
import {TISService} from '../service/tis.service';
// import {ScriptService} from '../service/script.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BasicFormComponent} from "../common/basic.form.component";

@Component({
  // templateUrl: '/runtime/jarcontent/copy_config_from_other_app.htm?an={dddd}'
  template: `
      <fieldset [disabled]='formDisabled'>
          <div class="modal-header">
              <h4 class="modal-title">从其他索引拷贝配置</h4>
              <button type="button" class="close" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <div class="modal-body">
              <tis-msg [result]="result"></tis-msg>
              <form #configfrom method="post" role="form">
                  <input type="hidden" name="action" value="add_app_action"/>
                  <input type="hidden" name="event_submit_do_copy_config_from_other_app" value="y"/>
                  <input type="hidden" name="toAppId" value="-1"/>
                  <h3>请选择配置部门</h3>
                  <div class="form-group">
                      <p class="appselectboxcontrol">

                          <span class="navbar-text" style="width:4em;">业务线：</span>
                          <select id="bizidmain" (change)="departmentChange()" [(ngModel)]="departmentId" name="combDptid">
                              <option value="">请选择</option>
                              <option
                                      value="356">/2dfire/Engineering department
                              </option>
                              <option
                                      value="360">/2dfire/crm
                              </option>
                              <option
                                      value="358">/2dfire/data-center
                              </option>
                              <option
                                      value="359">/2dfire/resale
                              </option>
                              <option
                                      value="357">/2dfire/supplyGoods
                              </option>
                          </select>
                          <span class="navbar-text">索引：</span>
                         <!--
                          <select id="appidsmain" name="combAppid" [(ngModel)]="appId">
                              <option value="">请选择</option>
                              <option *ngFor="let o of ops" [value]="o.name">{{o.name}}</option>
                          </select>
                          -->
                          <br/>
                      </p>
                      <div class="form-group">
                          <label for="query">应用</label>
                          <input type="text" class="form-control" name="appnamesuggest" id="query" size="40" placeholder="search4"/>
                          <input type="hidden" id="hidappname" name="hiddenAppnamesuggest"/>
                      </div>
                  </div>
                  <button type="submit" class="btn btn-primary" (click)="doCopy(configfrom)">执行拷贝</button>
              </form>
          </div>
      </fieldset>
  `
})
export class CopyOtherCoreComponent extends BasicFormComponent {
  departmentId: any;

  constructor(tisService: TISService, modalService: NgbModal) {
    super(tisService, modalService);
  }

  // 执行拷贝
  public doCopy(configfrom: any): void {

  }

  departmentChange() {
  }
}