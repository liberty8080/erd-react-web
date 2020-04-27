import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom';
import {data} from './data';
import G6 from '@antv/g6';
import ToolBar from "./TopBar";
import './RegisterBehavior';
import './RegisterEdge';
import './RegisterNode';
import ToolTip from "./ToolTip";

export default function (props) {
    const ref = React.useRef(null);
    let graph = null;

    const [showNodeTooltip, setShowNodeTooltip] = useState(false);
    const [nodeTooltipX, setNodeToolTipX] = useState(0);
    const [nodeTooltipY, setNodeToolTipY] = useState(0);
    const [model, setModel] = useState(null);
    const [rootGraph, setRootGraph] = useState();
    const [nodeModel, setNodeModel] = useState();
    const [editMode, setEditMode] = useState("default");
    const [fastEdit, setFastEdit] = useState(false);

// 实例化 minimap 插件
    const minimap = new G6.Minimap({
        size: [100, 100],
        className: 'minimap',
        type: 'delegate',
        position: 'absolute'

    });
// 实例化 grid 插件
    const grid = new G6.Grid();

    const bindEvents = () => {
        // 监听node上面mouse事件
        graph.on('node:mouseenter', evt => {
            document.oncontextmenu = () => {
                return false
            };
            const {item} = evt;
            const model = item.getModel();
            console.info(graph);
            const {x, y} = model;
            const point = graph.getCanvasByPoint(x, y);
            setModel(model);
            setNodeToolTipX(point.x);
            setNodeToolTipY(point.y);
            setShowNodeTooltip(true);
            setNodeModel(item);
        });
        graph.on('keydown', evt => {
            //当按下ESC时隐藏该框
            if (evt.keyCode === 27) {
                setShowNodeTooltip(false)
            }
        })

    };

    //切换编辑模式
    const switchMode = (evt) => {
        setEditMode(evt.target.value);
        setRootGraph(rootGraph);
        rootGraph.setMode(evt.target.value)
    };

    //更新label
    const updateLabel = (evt) => {
        if (evt.keyCode === 13) {
            rootGraph.updateItem(
                nodeModel, {
                    label: evt.target.value
                }
            );
        }

        if (evt.keyCode === 46) {
            rootGraph.remove(nodeModel)
        }
    };
    //关闭快速编辑弹窗
    const destroyToolTip = () => {
        setShowNodeTooltip(false)
    };
    //移除节点
    const removeNode = () => {
        rootGraph.remove(nodeModel);
        setShowNodeTooltip(false)
    };
    //切换快速编辑模式
    const fastEditSwitch = () => {
        setFastEdit(!fastEdit);
    };

    useEffect(() => {
        if (!graph) {
            graph = new G6.Graph({
                container: ReactDOM.findDOMNode(ref.current),
                width: window.innerWidth,
                height: window.innerHeight,
                fitView: true,

                // container: "mountNode",
                plugins: [minimap, grid],
                modes: {
                    // 默认交互模式
                    default: ['drag-node', 'drag-canvas', 'zoom-canvas'],
                    // 增加节点交互模式
                    addEntity: ['click-add-node', 'click-select'],

                    addProperty: ['click-add-node', 'click-select'],
                    // 增加边交互模式
                    addEdge: ['click-add-edge', 'click-select'],
                },

                nodeStateStyles: {
                    // 节点在 selected 状态下的样式，对应内置的 click-select 行为
                    selected: {
                        stroke: '#666',
                        lineWidth: 2,
                        fill: 'steelblue'
                    }
                },
                defaultNode: {
                    // shape: 'node',
                    anchorPoints: [
                        [0.5, 0.5]
                    ],
                    style: {
                        stroke: '#72CC4A',
                        // width: 15
                    }
                },
            });
            setRootGraph(graph);

        }
        graph.data(data);
        graph.render();

        bindEvents();

    }, []);


    return <div ref={ref}>
        <ToolBar graph={rootGraph} handleChange={switchMode} editMode={editMode} checked={fastEdit}
                 toggleChecked={fastEditSwitch}/>
        {fastEdit && showNodeTooltip && <ToolTip x={nodeTooltipX} y={nodeTooltipY}
                                                 removeNode={removeNode} updateLabel={updateLabel} label={model.label}
                                                 destroyToolTip={destroyToolTip}/>}
    </div>;
}
