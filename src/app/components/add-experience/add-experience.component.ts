import { Component, Inject, OnInit } from '@angular/core';
import Quill from 'quill';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-add-experience',
  templateUrl: './add-experience.component.html',
  styleUrls: ['./add-experience.component.scss']
})
export class AddExperienceComponent implements OnInit {

  theme = '';
  modules = {};
  readOnly = false;
  placeholder = '';
  maxLength = -1;
  minLength = -1;
  required = false;
  formats = [];
  scrollingContainer = 'html, body';
  bounds ;
  quillConfiguration = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    ['link'],
    ['clean'],
  ],
}
  editorContent: string = '';
  constructor(@Inject(DOCUMENT) private document: Document) {
    this.theme = 'snow';
    this.modules = {};
    this.readOnly = false;
    this.placeholder = '';
    this.maxLength = -1;
    this.minLength = -1;
    this.required = false;
    this.formats = [];
    this.scrollingContainer = 'html, body';
    this.bounds = document.body;
   }

  ngOnInit(): void {
    this.editorContent = '<p>Hello, Quill!</p>';
  }

   ngAfterViewInit() {
    // Create a Quill instance and bind it to the "editor" div
    const quill = new Quill('#editor', {
      theme: 'snow' // or 'bubble'
    });
    
    // Listen for editor changes and update content
    quill.on('text-change', () => {
      this.editorContent = quill.root.innerHTML;
    });
  }
}
