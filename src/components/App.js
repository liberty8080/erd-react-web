import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom';
import G6 from '@antv/g6';
import ToolBar from "./TopBar";
import './RegisterBehavior';
import './RegisterEdge';
import './RegisterNode';
import ToolTip from "./ToolTip";
import axios from "axios";
// import {data} from "./data";
import EdgeToolTip from "./EdgeToolTip";

export default function (props) {
    const ref = React.useRef(null);
    let graph = null;

    const [showNodeTooltip, setShowNodeTooltip] = useState(false);
    const [showEdgeTooltip, setShowEdgeTooltip] = useState(false);
    const [nodeTooltipX, setNodeToolTipX] = useState(0);
    const [nodeTooltipY, setNodeToolTipY] = useState(0);
    const [edgeTooltipX, setEdgeTooltipX] = useState(0);
    const [edgeTooltipY, setEdgeTooltipY] = useState(0);
    const [edgeModel, setEdgeModel] = useState();
    const [edgeItem, setEdgeItem] = useState();
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
            // const {x, y} = model;
            // const point = graph.getCanvasByPoint(x, y);
            setModel(model);
            setNodeToolTipX(evt.clientX);
            setNodeToolTipY(evt.clientY);
            setShowNodeTooltip(true);
            setShowEdgeTooltip(false);
            setNodeModel(item);
        });
        graph.on('keydown', evt => {
            //当按下ESC时隐藏该框
            if (evt.keyCode === 27) {
                setShowNodeTooltip(false);
                setShowEdgeTooltip(false);
            }
        });
        graph.on('edge:mouseenter', event => {
            document.oncontextmenu = () => {
                return false;
            };
            const {item} = event;
            const model = item.getModel();
            setEdgeModel(model);
            setEdgeItem(item);
            setShowEdgeTooltip(true);
            setShowNodeTooltip(false);
            setEdgeTooltipX(event.clientX);
            setEdgeTooltipY(event.clientY);

        })
    };

    //切换编辑模式
    const switchMode = (evt) => {
        setEditMode(evt.target.value);
        setRootGraph(rootGraph);
        rootGraph.setMode(evt.target.value);
        switch (evt.target.value) {
            case "addEntity":
                setFastEdit(false);
                break;
            case "addProperty":
                setFastEdit(false);
                break;
            case "addEdge":
                setFastEdit(false);
                break;
            default:
                break;

        }
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
    //更新联系名称
    const onRelationNameChange = (event) => {
        rootGraph.updateItem(
            edgeItem, {
                relationName: event.target.value
            }
        )
    };
    //更新联系类型
    const onRelationTypeChange = (e) => {
        console.info(e.target.value);
        let relationType = e.target.value;

        function updateRelation(relationType, sourceType, targetType) {
            setEdgeModel({...edgeModel, relation: relationType})
            rootGraph.updateItem(
                edgeItem, {
                    relation: relationType,
                    sourceEntity: sourceType,
                    targetEntity: targetType
                }
            );
        }

        switch (relationType) {
            case "1to1":
                updateRelation(relationType, "1", "1");
                break;
            case "1toN":
                updateRelation(relationType, "1", "N");
                break;
            case "Nto1":
                updateRelation(relationType, "N", "1");
                break;
            case "NtoN":
                updateRelation(relationType, "N", "N");
                break;
            default:
                break;

        }
    };
    //关闭快速编辑弹窗
    const destroyToolTip = () => {
        setShowNodeTooltip(false);
        setShowEdgeTooltip(false);
    };
    //移除节点
    const removeNode = () => {
        rootGraph.remove(nodeModel);
        setShowNodeTooltip(false)
    };

    const removeEdge = () => {
        rootGraph.remove(edgeItem);
        setShowEdgeTooltip(false);
    };
    //切换快速编辑模式
    const fastEditSwitch = () => {
        setFastEdit(!fastEdit);
    };


    useEffect(() => {
        const fetchData = async () => {
            await axios("http://192.168.98.11:8080/erd/user-data/getDataById", {params: {dataId: props.match.params.dataId}})
                .then((res) => {
                    let erd = res.data.data;
                    erd = JSON.parse(erd);
                    if (typeof erd.data !== "undefined") {
                        console.info(erd.data);
                        erd.data = JSON.parse(erd.data);
                    } else {
                        erd.data = {}
                    }
                    // setErdData(erd);
                    graph.data(erd.data);
                    graph.render();
                });
        };
        fetchData();


        if (!graph) {
            graph = new G6.Graph({
                container: ReactDOM.findDOMNode(ref.current),
                width: window.innerWidth,
                height: window.innerHeight,
                // fitView: true,

                // container: "mountNode",
                plugins: [minimap, grid],
                modes: {
                    // 默认交互模式
                    default: ['drag-node', 'drag-canvas', 'zoom-canvas'],
                    // 增加节点交互模式
                    addEntity: ['click-add-entity', 'click-select'],

                    addProperty: ['click-add-property', 'click-select'],
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
                        [0.5, 0], [0.5, 1], [0, 0.5], [1, 0.5]
                    ],
                    style: {
                        stroke: '#72CC4A',
                        // width: 15
                    }
                },
                layout: {
                    type: 'force',
                    center: [ 200, 200 ],     // 可选，默认为图的中心
                    linkDistance: 300,         // 可选，边长
                    nodeStrength: 30,         // 可选
                    edgeStrength: 0.1,        // 可选
                    collideStrength: 0.8,     // 可选
                    nodeSize: 30,             // 可选
                    alpha: 0.3,               // 可选
                    alphaDecay: 0.028,        // 可选
                    alphaMin: 0.01,           // 可选
                    forceSimulation: null,    // 可选
                   /* onTick: () => {           // 可选
                    },
                    onLayoutEnd: () => {      // 可选
                        console.log('force layout done');
                    }*/
                }

            });
            setRootGraph(graph);

        }

        bindEvents();

    }, []);


    return <div ref={ref}>
        <ToolBar graph={rootGraph} handleChange={switchMode} editMode={editMode} checked={fastEdit}
                 toggleChecked={fastEditSwitch} dataId={props.match.params.dataId}/>
        {fastEdit && showNodeTooltip &&
        <ToolTip x={nodeTooltipX} y={nodeTooltipY}
                 removeNode={removeNode} updateLabel={updateLabel} label={model.label}
                 destroyToolTip={destroyToolTip}/>}
        {fastEdit && showEdgeTooltip &&
        <EdgeToolTip x={edgeTooltipX} y={edgeTooltipY} edgeModel={edgeModel} onRelationNameChange={onRelationNameChange}
                     removeEdge={removeEdge} destroyToolTip={destroyToolTip}
                     onRelationTypeChange={onRelationTypeChange}/>}
    </div>;
}
