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
      'records, visitors, विजिटर्स': 'If you want to add visitors please refer this : <a href="https://viksitbharatinnovate.com/#/add-records" target=_blank>https://viksitbharatinnovate.com/#/add-records</a> <br> If you want to see all visitors please refer this : <a href="https://viksitbharatinnovate.com/#/records" target=_blank>https://viksitbharatinnovate.com/#/records</a>',
      'katrane, paper cutting, कात्रणे, सर्व कात्रणे': 'If you want to add news paper cutting please refer this : <a href="https://viksitbharatinnovate.com/#/कात्रणे" target=_blank>https://viksitbharatinnovate.com/#/कात्रणे</a> <br> If you want to see all news paper cutting please refer this : <a href="https://viksitbharatinnovate.com/#/सर्व-कात्रणे" target=_blank>https://viksitbharatinnovate.com/#/सर्व-कात्रणे</a>',
      'aavak, आवक, सर्व-आवक': 'If you want to add aavak please refer this : <a href="https://viksitbharatinnovate.com/#/आवक" target=_blank>https://viksitbharatinnovate.com/#/आवक</a> <br> If you want to see all aavak please refer this : <a href="https://viksitbharatinnovate.com/#/सर्व-आवक" target=_blank>https://viksitbharatinnovate.com/#/सर्व-आवक</a>',
      'javak, जावक, सर्व-जावक': 'If you want to add javak please refer this : <a href="https://viksitbharatinnovate.com/#/जावक" target=_blank>https://viksitbharatinnovate.com/#/जावक</a> <br> If you want to see all javak please refer this : <a href="https://viksitbharatinnovate.com/#/सर्व-जावक" target=_blank>https://viksitbharatinnovate.com/#/सर्व-जावक</a>',
      'patravyavhar, पत्रव्यवहार': 'If you want to see the patravyavhar templates please refer this : <a href="https://viksitbharatinnovate.com/#/पत्रव्यवहार" target=_blank>https://viksitbharatinnovate.com/#/पत्रव्यवहार</a>',
      'karykram, events, कार्यक्रम, सर्व-कार्यक्रम': 'If you want to add karykram details please refer this : <a href="https://viksitbharatinnovate.com/#/कार्यक्रम" target=_blank>https://viksitbharatinnovate.com/#/कार्यक्रम</a> <br> If you want to see all karykram details please refer this : <a href="https://viksitbharatinnovate.com/#/सर्व-कार्यक्रम" target=_blank>https://viksitbharatinnovate.com/#/सर्व-कार्यक्रम</a>',
      'contact, महत्वाचे संपर्क': 'If you want to contact us please refer this : <a href="https://viksitbharatinnovate.com/#/महत्वाचे संपर्क" target=_blank>https://viksitbharatinnovate.com/#/महत्वाचे संपर्क</a>',
      'privacy policy, contact us, VBH-Helpline ': 'If you want to see the privacy policy please refer this : <a href="https://viksitbharatinnovate.com/#/VBH-Helpline" target=_blank>https://viksitbharatinnovate.com/#/VBH-Helpline</a>',
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
