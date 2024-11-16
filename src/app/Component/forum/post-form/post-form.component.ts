import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent {
  postForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.postForm = this.fb.group({
      title: [''],
      content: [''],
      font: ['Arial'],
      youtubeUrl: ['']
    });
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  submitPost() {
    const formData = new FormData();
    formData.append('title', this.postForm.get('title')?.value);
    formData.append('content', this.postForm.get('content')?.value);
    formData.append('font', this.postForm.get('font')?.value);
    formData.append('youtubeUrl', this.postForm.get('youtubeUrl')?.value);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.http.post('http://localhost:3000/api/posts', formData)
      .subscribe(response => {
        console.log('Post uploaded successfully', response);
      });
  }
}
