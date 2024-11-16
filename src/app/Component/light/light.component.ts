import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserpersonelinfoService } from 'src/app/Service/userService/userpersonelinfo.service';
import { UserPersonelinfo } from 'src/app/Interface/userInterface/userpersonelinfo';
import { BlessedPerson } from 'src/app/Interface/lightInterface/blessed-person';

@Component({
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.css']
})
export class LightComponent implements OnInit {

  user: UserPersonelinfo = {
    fUserEmail: '',
    fUserName: '',
    fUserPhone: '',
    fUserGender: null,
    fUserAddress: '',
    fUserBirthdate: '',
    fUserNickName: '',
    fUserState: '',
    fUserStateId: 2,
    fUserImage: '',
  };

  blessedPersons: BlessedPerson[] = [];
  showBlessedPersonForm: boolean = false;
  currentBlessedPerson = {
    name: '',
    birthDate: '',
    address: '',
    startDate: '',
    plan: '',
    fee: 1000
  };

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(private userpersonelinfoService: UserpersonelinfoService) { }

  ngOnInit(): void {
    this.loadUserData();
  }

  private loadUserData(): void {
    const userId = this.userpersonelinfoService.getUserid();
    if (userId) {
      this.userpersonelinfoService.getUserDetails(userId).subscribe({
        next: (data: UserPersonelinfo) => {
          this.user = data;
        },
        error: (error) => {
          console.error('Error fetching user details:', error);
        }
      });
    }
  }

  addBlessedPerson() {
    this.showBlessedPersonForm = true;
  }

  saveBlessedPerson() {
    if (!this.currentBlessedPerson.name ||
        !this.currentBlessedPerson.birthDate ||
        !this.currentBlessedPerson.address ||
        !this.currentBlessedPerson.startDate ||
        !this.currentBlessedPerson.plan) {
      alert('所有欄位都必須填寫！');
      return;
    }

    this.blessedPersons.push({...this.currentBlessedPerson});
    this.currentBlessedPerson = {
      name: '',
      birthDate: '',
      address: '',
      startDate: '',
      plan: '',
      fee: 1000
    };
    this.showBlessedPersonForm = false;
  }

  cancelBlessedPerson() {
    this.showBlessedPersonForm = false;
    this.currentBlessedPerson = {
      name: '',
      birthDate: '',
      address: '',
      startDate: '',
      plan: '',
      fee: 1000
    };
  }

  removeBlessedPerson(index: number) {
    this.blessedPersons.splice(index, 1);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (file.type !== 'text/csv') {
        alert('請上傳CSV檔案！');
        this.fileInput.nativeElement.value = '';
        return;
      }
    }
  }

  uploadCSV() {
    const fileInput = this.fileInput.nativeElement;
    if (!fileInput.files || fileInput.files.length === 0) {
      alert('請選擇檔案！');
      return;
    }

    const file = fileInput.files[0];

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const text = e.target.result;
      const lines = text.split('\n');

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line) {
          const values: string[] = line.split(',').map((value: string) => value.trim());
          if (values.length < 5 || values.some((value: string) => value === '')) {
            alert('上傳CSV有誤，不得為空值');
            this.fileInput.nativeElement.value = '';
            return;
          }
        }
      }

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line) {
          const [name, birthDate, address, startDate, plan] = line.split(',');

          let fee = 1000;
          switch (plan?.trim()) {
            case '90':
              fee = 2500;
              break;
            case '365':
              fee = 9999;
              break;
          }

          const newPerson: BlessedPerson = {
            name: name.trim(),
            birthDate: birthDate.trim(),
            address: address.trim(),
            startDate: startDate.trim(),
            plan: plan.trim(),
            fee: fee
          };

          this.blessedPersons.push(newPerson);
        }
      }

      this.fileInput.nativeElement.value = '';
    };

    reader.readAsText(file);
  }

  downloadSampleCSV() {
    const link = document.createElement('a');
    link.setAttribute('href', 'assets/light/sample.csv');
    link.setAttribute('download', '被祈福者資料範例.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  updateFee() {
    switch (this.currentBlessedPerson.plan) {
      case '30':
        this.currentBlessedPerson.fee = 1000;
        break;
      case '90':
        this.currentBlessedPerson.fee = 2500;
        break;
      case '365':
        this.currentBlessedPerson.fee = 9999;
        break;
    }
  }

  calculateTotal(): number {
    return this.blessedPersons.reduce((total, person) => total + person.fee, 0);
  }

  resetForm() {
    this.blessedPersons = [];
    this.showBlessedPersonForm = false;
    this.currentBlessedPerson = {
      name: '',
      birthDate: '',
      address: '',
      startDate: '',
      plan: '',
      fee: 1000
    };
  }

  submitForm() {
    console.log('表單提交');
  }
}
