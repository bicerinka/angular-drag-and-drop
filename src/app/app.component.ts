import {Component} from '@angular/core';

function remove(item: string, list: any[]) {
    if (list.indexOf(item) !== -1) {
        list.splice(list.indexOf(item), 1);
    }
}

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    // availableBoxes = [
    //   'Box 1',
    // ];

    dropzones = [[
        ['67', 0],
        ['2', 0],
        ['33', 0],
        ['11', 0],
        ['1', 0],
        ['3', 0],
    ],
        [
            ['117', 0],
            ['7', 0],
            ['8', 0],
            ['9', 0],
            ['10', 0],
            ['11', 0],
            ['12', 0]
        ]];

    currentBox?: string;

    editorButton = false;
    currentItem = '';
    currentDropzone: number;
    currentIndex: number;
    mousedownInfo = [];

    move(box: string, toList: any[] = []): void {
        // remove(box, this.availableBoxes);
        remove(box, this.dropzones[0]);
        remove(box, this.dropzones[1]);

        toList.push(box);
    }

    edit(dropzone, index, box) {
        if (!this.editorButton) {
            this.currentDropzone = dropzone;
            this.currentIndex = index;
            this.currentItem = box[0];
        } else {
            this.editorButton = false;
        }
    }

    elemMousedown(dropzone, index, box) {
        this.mousedownInfo.push(dropzone, index, box);
    }

    elemMouseup(event: MouseEvent, dropzone, index) {
        let start = this.mousedownInfo[1],
            box = this.mousedownInfo[2],
            zone = this.dropzones[dropzone];
        if (this.mousedownInfo[0] == dropzone && start !== index) {
            if (start > index) {
                zone.splice(start, 1);
                zone.splice(index + 1, 0, box);
            } else {
                zone.splice(index + 1, 0, box);
                zone.splice(start, 1);
            }
        } else if (this.mousedownInfo[0] !== dropzone && box !== undefined) {
            zone.splice(index + 1, 0, box);
            zone.splice(zone.length - 1, 1);
        }
        this.mousedownInfo = [];

    }

    clear() {
        this.currentItem = '';
        this.currentDropzone = -1;
        this.currentIndex = -1;
    }

    cancel() {
        this.clear();
        this.editorButton = true;
    }

    save() {
        this.editorButton = true;
        if (this.currentItem !== this.currentBox[0]) {
            this.dropzones[this.currentDropzone][this.currentIndex][0] = this.currentItem;
            this.clear();
        } else {
            this.cancel();
        }
    }

    end() {
        this.editorButton = true;
        let zone = this.dropzones[this.currentDropzone],
            index = this.currentIndex;
        zone[index][1] = 1;
        for (let i = zone.length - 1; i > index; i--) {
            if (!zone[i][1]) {
                [zone[index], zone[i]] = [zone[i], zone[index]];
            }
        }
        this.clear();
    }

    sorting(zone) {
        this.dropzones[zone].sort(function (a: any, b: any) {
            if (!a[1] && !b[1]) {
                return a[0] - b[0];
            }
        });
    }

}