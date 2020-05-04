import React from "react";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";

function AddEmptyErd(props) {

    const {handleClose, erdData, onChange, handleAccept} = props;

    return (<div>
        <Dialog open={erdData.open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">新增E-R图</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    输入实体及属性就可以快速添加
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="名称"
                    name="dataName"
                    type="text"
                    fullWidth
                    /*onChange={(event) => {
                        setDataName(event.target.value)
                    }}*/
                    onChange={onChange}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="desc"
                    label="描述"
                    name="desc"
                    type="email"
                    fullWidth
                    /*onChange={(event) => {
                        setDesc(event.target.value)
                    }}*/
                    onChange={onChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    取消
                </Button>
                <Button onClick={handleAccept} color="primary">
                    确认
                </Button>
            </DialogActions>
        </Dialog>
    </div>)
}

export default AddEmptyErd;