import { Component, ViewChild, AfterViewInit, Renderer2, Input, ElementRef, Inject, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as ko from "knockout";
import { Html } from "devexpress-reporting/dx-web-document-viewer";
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'report-viewer',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './report-viewer.component.html',
    // styleUrls: ["../../../../../node_modules/devexpress-reporting/css/web-document-viewer-light.min.css"]
})
export class ReportViewerComponent implements AfterViewInit {
    @ViewChild('scripts')
    scripts: ElementRef;

    @ViewChild("control")
    control: ElementRef

    constructor(private renderer: Renderer2) { }

    ngAfterViewInit() {

        const reportUrl = ko["observable"]("Products"),
            container = this.renderer.createElement("div");
        container.innerHTML = Html;
        var host = `${environment.repotr_url}`;
        this.renderer.appendChild(this.scripts.nativeElement, container);
        ko.applyBindings({
            reportUrl,
            requestOptions: {
                host,
                invokeAction: 'WebDocumentViewer/Invoke'
            }
        }, this.control.nativeElement);
    }

}