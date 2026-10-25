
import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  Alert,
} from 'react-native';

import styles from './styles';

type Task = {
  id: string;
  title: string;
  done: boolean;
};

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskText, setTaskText] = useState('');
  const nextId = useRef(1);

  const addTask = () => {
    const trimmedText = taskText.trim();

    // Show alert if input is empty or contains only spaces
    if (trimmedText.length === 0) {
      Alert.alert(
        'Warning',
        'Please enter a task before clicking Add.',
        [{ text: 'OK' }],
      );
      return;
    }

    const newTask: Task = {
      id: `${Date.now()}-${nextId.current++}`,
      title: trimmedText,
      done: false,
    };

    setTasks(currentTasks => [...currentTasks, newTask]);
    setTaskText('');
  };

  const toggleTask = (id: string) => {
    setTasks(currentTasks =>
      currentTasks.map(task =>
        task.id === id
          ? { ...task, done: !task.done }
          : task,
      ),
    );
  };

  const deleteTask = (id: string) => {
    setTasks(currentTasks =>
      currentTasks.filter(task => task.id !== id),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>My Task Manager</Text>

      <Text style={styles.subtitle}>
        Organize your day, one task at a time.
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a task..."
          value={taskText}
          onChangeText={setTaskText}
          onSubmitEditing={addTask}
          returnKeyType="done"
        />

        <Pressable
          style={styles.addButton}
          onPress={addTask}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </View>

      <Text style={styles.listHeading}>
        Your Tasks ({tasks.length})
      </Text>

      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        contentContainerStyle={
          tasks.length === 0
            ? styles.emptyContainer
            : undefined
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No tasks yet — add one above!
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.taskRow}>
            <Pressable
              style={styles.taskContent}
              onPress={() => toggleTask(item.id)}
            >
              <Text style={styles.checkmark}>
                {item.done ? '✓' : '○'}
              </Text>

              <Text
                style={[
                  styles.taskTitle,
                  item.done && styles.completedTask,
                ]}
              >
                {item.title}
              </Text>
            </Pressable>

            <Pressable
              style={styles.deleteButton}
              onPress={() => deleteTask(item.id)}
            >
              <Text style={styles.deleteButtonText}>
                Delete
              </Text>
            </Pressable>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default App;
