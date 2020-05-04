import G6 from "@antv/g6";
import {v4 as uuidv4} from "uuid";

G6.registerBehavior('click-add-edge', {
    getEvents() {
        return {
            'node:click': 'onClick',
            mousemove: 'onMousemove',
            'edge:click': 'onEdgeClick' // 点击空白处，取消边
        };
    },
    onClick(ev) {
        const node = ev.item;
        const graph = this.graph;
        const point = {
            x: ev.x,
            y: ev.y
        };
        const model = node.getModel();
        if (this.addingEdge && this.edge) {
            graph.updateItem(this.edge, {
                target: model.id
            });
            // graph.setItemState(this.edge, 'selected', true);
            this.edge = null;
            this.addingEdge = false;
        } else {
            this.edge = graph.addItem('edge', {
                source: model.id,
                target: point,
                type: 'relation'
            });
            this.addingEdge = true;
        }
    },
    onMousemove(ev) {
        const point = {
            x: ev.x,
            y: ev.y
        };
        if (this.addingEdge && this.edge) {
            this.graph.updateItem(this.edge, {
                target: point
            });
        }
    },
    onEdgeClick(ev) {
        const currentEdge = ev.item;
        const graph = this.graph;
        // 拖拽过程中，点击会点击到新增的边上
        if (this.addingEdge && this.edge === currentEdge) {
            graph.removeItem(this.edge);
            this.edge = null;
            this.addingEdge = false;
        }
    }
});

// 注册节点
G6.registerBehavior('click-add-entity', {
    getEvents() {
        return {
            'canvas:click': 'onClick'
        };
    },
    onClick(ev) {
        const graph = this.graph;
        const node = graph.addItem('node', {
            x: ev.x,
            //y: ev.canvasY,   //官方教程坐标，不知为何是canvasXY，实际应为x,y
            y: ev.y,
            id: `node-${uuidv4()}`, // 生成唯一的 id
            type: 'entity'

        });
    }
});

G6.registerBehavior("click-add-property",{
    getEvents() {
        return {
            'canvas:click': 'onClick'
        };
    },
    onClick(ev) {
        const graph = this.graph;
        const node = graph.addItem('node', {
            x: ev.x,
            //y: ev.canvasY,   //官方教程坐标，不知为何是canvasXY，实际应为x,y
            y: ev.y,
            id: `node-${uuidv4()}`, // 生成唯一的 id
            type: 'property'

        });
    }
});
