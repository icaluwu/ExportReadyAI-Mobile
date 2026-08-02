import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/theme/colors';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

export default function ConsultantScreen() {
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Halo! Saya Konsultan Ekspor AI ExportReady. Ada yang bisa saya bantu terkait persyaratan sertifikasi, pilihan negara tujuan, atau regulasi bea cukai ekspor?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: `Terima kasih atas pertanyaan Anda mengenai "${userMsg.text}". Untuk mengekspor produk ke pasar sasaran, pastikan Anda memenuhi regulasi kebersihan, label komposisi bahasa lokal, dan Certificate of Origin (SKA).`,
      };
      setMessages((prev) => [...prev, aiMsg]);
      setLoading(false);
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={[styles.messagesContainer, { paddingBottom: 20 }]}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageBubble,
              msg.sender === 'user' ? styles.userBubble : styles.aiBubble,
            ]}
          >
            <Text
              style={[
                styles.messageText,
                msg.sender === 'user' ? styles.userText : styles.aiText,
              ]}
            >
              {msg.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={[styles.inputBar, { paddingBottom: Math.max(insets.bottom, 12) }]}>
        <TextInput
          style={styles.textInput}
          placeholder="Tanyakan topik ekspor..."
          value={input}
          onChangeText={setInput}
          placeholderTextColor="#94A3B8"
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage} disabled={loading}>
          <Text style={styles.sendText}>Kirim</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.background,
  },
  messagesContainer: {
    padding: 16,
  },
  messageBubble: {
    maxWidth: '82%',
    padding: 14,
    borderRadius: 16,
    marginVertical: 6,
  },
  userBubble: {
    backgroundColor: colors.light.primary,
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
  },
  userText: {
    color: '#FFFFFF',
  },
  aiText: {
    color: colors.light.foreground,
  },
  inputBar: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    height: 44,
    backgroundColor: '#F1F5F9',
    borderRadius: 22,
    paddingHorizontal: 16,
    fontSize: 15,
    color: colors.light.foreground,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: colors.light.accent,
    paddingHorizontal: 18,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
});
