1. user

Stores user-related data.

Column	Type	Purpose
id	int	Primary key.
login	varchar	User login (unique).
name	varchar	User’s full name.
email	varchar	Email (unique).
role	varchar	User role (e.g., admin, user).
password	varchar	Hashed password.
isActive	boolean	Whether the user account is active.
lastLogin	timestamp	Timestamp of the user’s last login.
createdAt	timestamp	Auto-generated timestamp for creation.
updatedAt	timestamp	Auto-generated timestamp for updates.

2. chat

Stores chat sessions between users.

Column	Type	Purpose
id	int	Primary key.
userId	int (FK)	References the user initiating the chat.
topic	varchar	Topic or title of the chat.
isActive	boolean	Whether the chat is active.
createdAt	timestamp	Auto-generated timestamp for chat creation.

3. message

Stores individual chat messages.

Column	Type	Purpose
id	int	Primary key.
chatId	int (FK)	References the chat to which this message belongs.
userId	int (FK)	References the user who sent the message.
prompt	text	Message content (e.g., question or input).
response	text	Chatbot response (if applicable).
totalCost	numeric	Cost of tokens for this message (if applicable).
totalTokens	int	Number of tokens consumed (if applicable).
isRead	boolean	Indicates whether the message has been read by the recipient.
createdAt	timestamp	Auto-generated timestamp for message creation.

4. chat_history

Stores a log of chat interactions for analytics or history purposes.

Column	Type	Purpose
id	int	Primary key.
userId	int (FK)	References the user for whom the history is logged.
chatId	int (FK)	References the chat session.
createdAt	timestamp	Auto-generated timestamp for the history creation.
