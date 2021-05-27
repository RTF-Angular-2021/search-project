import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-post-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onAdd: EventEmitter<any> = new EventEmitter<any>();

  placeHolder = 'Введите запрос, например: ';

  inquiry = '';

  constructor() { }

  ngOnInit(): void {
    if (document.documentElement.clientWidth > 768) {
      const questions: Array<Array<string>> = [
        'Google Kubernetes'.split(''),
        'Apache Spark'.split(''),
        'Microsoft Visual Studio Code'.split(''),
        'NixOS Package Collection'.split(''),
        'Rust'.split(''),
        'Firehol IP Lists'.split(''),
        'Red Hat OpenShift'.split(''),
        'Ansible'.split(''),
        'Automattic WordPress Calypso'.split(''),
        'Microsoft .NET CoreFX'.split(''),
        'Microsoft .NET Roslyn'.split(''),
        'Node.js'.split(''),
        'TensorFlow'.split(''),
        'freeCodeCamp'.split(''),
        'Space Station 13'.split(''),
        'Apple Swift'.split(''),
        'Elasticsearch'.split(''),
        'Moby'.split(''),
        'CockroachDB'.split(''),
        'Cydia Compatibility Checker'.split(''),
        'Servo'.split(''),
        'Google Flutter'.split(''),
        'macOS Homebrew Package Manager'.split(''),
        'Home Assistant'.split(''),
        'Microsoft .NET CoreCLR'.split('')
      ];
      let direction = true;
      let questionNumber = 0;
      let index = 0;
      let time = 200;
      const request = () => {
        if (direction) {
          this.placeHolder += questions[questionNumber][index++];
          if (index === questions[questionNumber].length) { direction = false; }
        } else {
          this.placeHolder = this.placeHolder.substr(0, this.placeHolder.length - 1);
          index--;
          if (index === 0) {
            setTimeout(() => {
            }, 1000);
            direction = true;
            if (questionNumber === questions.length - 1) {
              questionNumber = 0;
            } else { questionNumber++; }
          }
        }
        if (index === questions[questionNumber].length || index === 0) {
          time = 1500;
        } else if (!direction) {
          time = 50;
        } else {
          time = 200;
        }
        timerId = setTimeout(request, time);
      };
      let timerId = setTimeout(request, time);
    } else { this.placeHolder = 'Ищите здесь...'; }
  }

  searchThis() {
    if (this.inquiry.trim()) {
      this.onAdd.emit(this.inquiry);
      this.inquiry = '';
    }
  }
}
