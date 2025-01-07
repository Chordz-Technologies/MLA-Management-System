import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ConfigService } from 'src/app/services/config.service';

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
  config = this.configService.getConfig();

  constructor(private eRef: ElementRef, private sanitizer: DomSanitizer, private configService: ConfigService) { }

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

      'records, visitors, विजिटर्स': `
      If you want to add visitors, please refer to this: 
      <a href="${this.config.addVisitors}" target="_blank">${this.config.addVisitors}</a> <br> 
      If you want to see all visitors, please refer to this: 
      <a href="${this.config.allVisitors}" target="_blank">${this.config.allVisitors}</a>`,

      'महत्वाच्या व्यक्ती, important persons': `
      If you want to add important persons, please refer to this: 
      <a href="${this.config.addImpPerson}" target="_blank">${this.config.addImpPerson}</a> <br> 
      If you want to see all important persons, please refer to this: 
      <a href="${this.config.allImpPerson}" target="_blank">${this.config.allImpPerson}</a>`,

      'katrane, paper cutting, कात्रणे, सर्व कात्रणे': `
      If you want to add newspaper cuttings, please refer to this: 
      <a href="${this.config.addPaperCutting}" target="_blank">${this.config.addPaperCutting}</a> <br> 
      If you want to see all newspaper cuttings, please refer to this: 
      <a href="${this.config.allPaperCutting}" target="_blank">${this.config.allPaperCutting}</a>`,

      'aavak, आवक, सर्व-आवक': `
      If you want to add aavak, please refer to this: 
      <a href="${this.config.addAavak}" target="_blank">${this.config.addAavak}</a> <br> 
      If you want to see all aavak, please refer to this: 
      <a href="${this.config.allAavak}" target="_blank">${this.config.allAavak}</a>`,

      'javak, जावक, सर्व-जावक': `
      If you want to add javak, please refer to this: 
      <a href="${this.config.addJavak}" target="_blank">${this.config.addJavak}</a> <br> 
      If you want to see all javak, please refer to this: 
      <a href="${this.config.allJavak}" target="_blank">${this.config.allJavak}</a>`,

      'patravyavhar, पत्रव्यवहार': `
      If you want to see the patravyavhar templates, please refer to this: 
      <a href="${this.config.patravyavhar}" target="_blank">${this.config.patravyavhar}</a>`,

      'karykram, events, कार्यक्रम, सर्व-कार्यक्रम': `
      If you want to add karykram details, please refer to this: 
      <a href="${this.config.addEvents}" target="_blank">${this.config.addEvents}</a> <br> 
      If you want to see all karykram details, please refer to this: 
      <a href="${this.config.allEvents}" target="_blank">${this.config.allEvents}</a>`,

      'contact, महत्वाचे संपर्क': `
      If you want to contact us, please refer to this: 
      <a href="${this.config.contact}" target="_blank">${this.config.contact}</a>`,

      'privacy policy, VBH Helpline': `
      If you want to see the privacy policy, please refer to this: 
      <a href="${this.config.helpline}" target="_blank">${this.config.helpline}</a>`,

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
