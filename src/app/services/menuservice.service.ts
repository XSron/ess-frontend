import { Subject } from 'rxjs';

export class MenuService {
    public routingChangeSubject: Subject<boolean> = new Subject<boolean>();
}