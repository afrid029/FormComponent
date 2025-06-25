import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormComponent } from './Components/reactive-form/reactive-form.component';
import { CommonModule } from '@angular/common';
import { GetDataService } from './Services/get-data.service';
import { DataViewModule } from 'primeng/dataview';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, ReactiveFormComponent, CommonModule, DataViewModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'FormComponent';
  visible : boolean = false;
  users : any[] = [];
  filteredData : any = {};
   @ViewChild('conatiner', {read: ViewContainerRef, static: true})
  container! : ViewContainerRef;

  /**
   *
   */
  constructor(private dataServ : GetDataService) {}
ngOnInit(): void {
  this.users = this.dataServ.getData();
}
  OpenModel(){
    this.visible = true
    // //  this.container?.clear();
    // const dynamicForm = this.container.createComponent(ReactiveFormComponent)
    // dynamicForm.instance.visible = true;

  }

  showDialog(Id:number) {
    // console.log(Id);
    this.filteredData = this.users.filter(d => d.Id == Id)[0];
    // console.log(filteredData);
      this.OpenModel();
    
    
  }

  
 onClose() {
    this.visible = false;
    this.filteredData = {};
    // this.container.clear();
  }
}
