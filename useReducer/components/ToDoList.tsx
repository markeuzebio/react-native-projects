import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useState, useReducer } from 'react';

interface ToDo {
    id: string;
    name: string;
}

interface State {
    toDos: ToDo[];
}

interface AddToDoAction {
    type: "ADD_TODO";
    payload: string;
}

interface RemoveToDoAction {
    type: "REMOVE_TODO";
    id: string;
}

type Action = AddToDoAction | RemoveToDoAction;

function reducer(state: State, action:Action):State {
    // If task is not composed of empty string
    switch(action.type) {
        case "ADD_TODO":
            return {
                toDos: [...state.toDos, { id: Date.now().toString(), name: action.payload }]
            };
            
        case "REMOVE_TODO":
            return {
                toDos: state.toDos.filter((toDo) => toDo.id != action.id)
            };

        default:
            return state;
    }
}

const ToDoList = () => {
    const [state, dispatch] = useReducer(reducer, { toDos: [] });
    const [text, setText] = useState<string>("");

    function renderToDo(toDoItem: ToDo) {
        return (
            <View style={{flexDirection: "row", justifyContent: "space-between", width: "100%", paddingHorizontal: 20}}>
                <Text>{toDoItem.name}</Text>
                <TouchableOpacity onPress={() => dispatch({type: "REMOVE_TODO", id: toDoItem.id})}>
                    <Text>Remove</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.body}>
            <View style={styles.container}>
                <Text style={styles.title}>ToDo List</Text>
                <TextInput value={text}
                           placeholder="Enter a task" 
                           onChangeText={(fieldText) => setText(fieldText)} 
                           placeholderTextColor="grey" 
                           style={styles.textInput}/>
                <Button title="Add Task" onPress={() => { dispatch({type: "ADD_TODO", payload: text})} }/>
            </View>
            <FlatList
                data={state.toDos}
                keyExtractor={ (toDoItem) => toDoItem.id }
                renderItem={({item}) => renderToDo(item)}
                style={{alignSelf: "flex-start"}}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 200,
        gap: 20
    },
    body: {
        alignItems: "center"
    },
    title: {
        fontSize: 25,
        fontWeight: "bold"
    },
    textInput: {
        padding: 10,
        borderStyle: "solid",
        borderColor: "black",
        borderWidth: 2
    }
})

export default ToDoList;