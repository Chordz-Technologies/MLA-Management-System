import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss'],
  animations: [
    trigger('chatPopupAnimation', [
      transition(':enter', [
        style({ transform: 'scale(0)' }),
        animate('200ms ease-out', style({ transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'scale(0)' }))
      ])
    ]),
    trigger('messageAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})

export class ChatbotComponent implements OnInit {
  @ViewChild('messageContainer') private messageContainer: ElementRef | undefined;
  messages: { text: string | SafeHtml, user: boolean }[] = [];
  userInput: string = '';
  chatOpen: boolean = false;
  firstTimeOpen: boolean = true;

  constructor(private eRef: ElementRef, private sanitizer: DomSanitizer) { }

  ngOnInit(): void { }

  sendMessage(): void {
    if (this.userInput.trim()) {
      this.messages.push({ text: this.userInput, user: true });
      const userMessage = this.userInput.toLowerCase();
      this.userInput = '';

      const botResponse = this.getBotResponse(userMessage);
      this.messages.push({ text: botResponse, user: false });

      setTimeout(() => this.scrollToBottom(), 0); // Ensure it runs after view update
    }
  }

  getBotResponse(message: string): SafeHtml {
    const responses: { [key: string]: string } = {
      'hi, hello': 'Hello! How can I help you?',
      'records, visitors': 'If you want to add records please refer this : <a href="https://viksitbharatinnovate.com/#/add-records" target=_blank>https://viksitbharatinnovate.com/#/add-records</a> <br> If you want to see all records please refer this : <a href="https://viksitbharatinnovate.com/#/records" target=_blank>https://viksitbharatinnovate.com/#/records</a>',
      'katrane, paper cuttings, कात्रणे, सर्व कात्रणे': 'If you want to add katrane please refer this : <a href="https://viksitbharatinnovate.com/#/कात्रणे" target=_blank>https://viksitbharatinnovate.com/#/कात्रणे</a> <br> If you want to see all katrane please refer this : <a href="https://viksitbharatinnovate.com/#/सर्व-कात्रणे" target=_blank>https://viksitbharatinnovate.com/#/सर्व-कात्रणे</a>',
      'aavak javak, आवक/जावक, सर्व-आवक/जावक': 'If you want to add aavak javak please refer this : <a href="https://viksitbharatinnovate.com/#/आवक/जावक" target=_blank>https://viksitbharatinnovate.com/#/आवक/जावक</a> <br> If you want to see all aavak javak please refer this : <a href="https://viksitbharatinnovate.com/#/सर्व-आवक/जावक" target=_blank>https://viksitbharatinnovate.com/#/सर्व-आवक/जावक</a>',
      'patravyavhar, पत्रव्यवहार': 'If you want to see the patravyavhar templates please refer this : <a href="https://viksitbharatinnovate.com/#/पत्रव्यवहार" target=_blank>https://viksitbharatinnovate.com/#/पत्रव्यवहार</a>',
      'yojaneche arja, योजनेचे-अर्ज, सर्व-योजनेचे-अर्ज': 'If you want to add yojaneche arja please refer this : <a href="https://viksitbharatinnovate.com/#/योजनेचे-अर्ज" target=_blank>https://viksitbharatinnovate.com/#/योजनेचे-अर्ज</a> <br> If you want to see all yojaneche arja please refer this : <a href="https://viksitbharatinnovate.com/#/सर्व-योजनेचे-अर्ज" target=_blank>https://viksitbharatinnovate.com/#/सर्व-योजनेचे-अर्ज</a>',
      'karykram, events, कार्यक्रम, सर्व-कार्यक्रम': 'If you want to add karykram details please refer this : <a href="https://viksitbharatinnovate.com/#/कार्यक्रम" target=_blank>https://viksitbharatinnovate.com/#/कार्यक्रम</a> <br> If you want to see all karykram details please refer this : <a href="https://viksitbharatinnovate.com/#/सर्व-कार्यक्रम" target=_blank>https://viksitbharatinnovate.com/#/सर्व-कार्यक्रम</a>',
      'contact': 'If you want to contact us please refer this : <a href="https://viksitbharatinnovate.com/#/contact_us" target=_blank>https://viksitbharatinnovate.com/#/contact_us</a>',
      'privacy policy': 'If you want to see the privacy policy please refer this : <a href="https://viksitbharatinnovate.com/#/privacy_policy" target=_blank>https://viksitbharatinnovate.com/#/<br>privacy_policy</a>',
      'bye': 'Goodbye! Have a great day!',
    };

    for (const keys in responses) {
      const keyArray = keys.split(/,|\//).map(key => key.trim().toLowerCase());
      if (keyArray.some(key => message.includes(key))) {
        return this.sanitizer.bypassSecurityTrustHtml(responses[keys]);
      }
    }
    return this.sanitizer.bypassSecurityTrustHtml("Sorry, I didn't understand that. Can you please rephrase?");
  }

  toggleChat(): void {
    this.chatOpen = !this.chatOpen;
    if (this.chatOpen && this.firstTimeOpen) {
      this.messages.push({ text: this.sanitizer.bypassSecurityTrustHtml('Hello, How can I help you?'), user: false });
      this.firstTimeOpen = false;
    }
    setTimeout(() => this.scrollToBottom(), 0); // Ensure it runs after view update
  }

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (this.chatOpen && !this.eRef.nativeElement.contains(event.target)) {
      this.chatOpen = false;
    }
  }

  private scrollToBottom(): void {
    if (this.messageContainer) {
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
    }
  }
}
