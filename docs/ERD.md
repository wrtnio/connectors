# Prisma Markdown
> Generated by [`prisma-markdown`](https://github.com/samchon/prisma-markdown)

- [AirportInformations](#airportinformations)
- [Articles](#articles)
- [Crunchbase](#crunchbase)
- [Similarweb](#similarweb)
- [X](#x)
- [Audits](#audits)
- [Inquiries](#inquiries)
- [Issues](#issues)
- [default](#default)

## AirportInformations
```mermaid
erDiagram
"airport_informations" {
  String id PK
  String en_airport_name
  String en_city_name
  String ko_airport_name
  String kr_country_name
  String kr_city_name
  String airport_code
  DateTime created_at
}
```

### `airport_informations`
Airport information from around the world.

**Properties**
  - `id`: Primary Key.
  - `en_airport_name`: Airport Name in English.
  - `en_city_name`: City Name in English.
  - `ko_airport_name`: Airport Name in Korean.
  - `kr_country_name`: Country Name in Korean.
  - `kr_city_name`: City Name in Korean.
  - `airport_code`: Airport Code.
  - `created_at`: The date and time the record was created.


## Articles
```mermaid
erDiagram
"attachment_files" {
  String id PK
  String name
  String extension "nullable"
  String url
  DateTime created_at
}
"bbs_articles" {
  String id PK
  String type
  DateTime created_at
  DateTime deleted_at "nullable"
}
"bbs_article_snapshots" {
  String id PK
  String bbs_article_id FK
  String format
  String title
  String body
  DateTime created_at
}
"bbs_article_snapshot_files" {
  String id PK
  String bbs_article_snapshot_id FK
  String attachment_file_id FK
  Int sequence
}
"bbs_article_comments" {
  String id PK
  String bbs_article_id FK
  String parent_id FK "nullable"
  String type
  DateTime created_at
  DateTime deleted_at "nullable"
}
"bbs_article_comment_snapshots" {
  String id PK
  String bbs_article_comment_id FK
  String format
  String body
  DateTime created_at
}
"bbs_article_comment_snapshot_files" {
  String id PK
  String bbs_article_comment_snapshot_id FK
  String attachment_file_id FK
  Int sequence
}
"bbs_article_exports" {
  String id PK
  String bbs_article_snapshot_id FK
  String provider
  String url
  DateTime created_at
  DateTime deleted_at "nullable"
}
"bbs_article_snapshots" }|--|| "bbs_articles" : article
"bbs_article_snapshot_files" }o--|| "bbs_article_snapshots" : snapshot
"bbs_article_snapshot_files" }o--|| "attachment_files" : file
"bbs_article_comments" }o--|| "bbs_articles" : article
"bbs_article_comments" }o--o| "bbs_article_comments" : parent
"bbs_article_comment_snapshots" }|--|| "bbs_article_comments" : comment
"bbs_article_comment_snapshot_files" }o--|| "bbs_article_comment_snapshots" : snapshot
"bbs_article_comment_snapshot_files" }o--|| "attachment_files" : file
"bbs_article_exports" }o--|| "bbs_article_snapshots" : snapshot
```

### `attachment_files`
Attachments.

Attachment entities used everywhere in this DB.

**Properties**
  - `id`: 
  - `name`: File name, excluding extension.
  - `extension`: Extension.
  - `url`: URL path to the file.
  - `created_at`: The date and time the record was created.

### `bbs_articles`
Article entity.

`bbs_articles` is a supertype entity for all types of articles existing 
in the current exchange system, and literally embodies individual articles 
on the bulletin board.

And elements such as titles and texts that must exist in articles do not exist 
in this `bbs_articles`, but exist in a 1:N relationship in the lower entity, 
[bbs_article_snapshots](#bbs_article_snapshots), because a new snapshot record is issued every time 
an article is modified.

The reason for issuing a new snapshot record every time an article is modified 
is to preserve evidence. Due to the nature of e-commerce, there is always 
a threat of conflict between participants.

And disputes can arise through articles or comments on them, and in this case, 
articles are designed in this structure to prevent manipulation of the situation 
by modifying existing articles.

To prevent so-called 'undercutting', keeping evidence and preventing fraud.

**Properties**
  - `id`: 
  - `type`: The type of subtype.
  - `created_at`: The date and time the article was created.
  - `deleted_at`: Date and time of article deletion.

### `bbs_article_snapshots`
Article Snapshots

`bbs_article_snapshots` is a snapshot entity that contains the content of 
an article. As explained in [bbs_articles](#bbs_articles), the content is separated 
from the article record to prevent undercutting.

**Properties**
  - `id`: Primary Key.
  - `bbs_article_id`: [bbs_articles.id](#bbs_articles) of the attached article
  - `format`
    > Format of the body.
    > 
    > Similar meanings of extensions: html, md, txt, etc.
  - `title`: Title of the article
  - `body`: Article body content
  - `created_at`
    > Record creation date.
    > 
    > When the article was first created or edited.

### `bbs_article_snapshot_files`
Attachment files of article snapshots.

`bbs_article_snapshot_files` is an entity that visualizes attachment files 
of article snapshots.

`bbs_article_snapshot_files` is a typical pair relationship table that 
resolves the M: N relationship between [bbs_article_snapshots](#bbs_article_snapshots) and
[attachment_files](#attachment_files). And to ensure the order of attachment files, it has 
an additional property, [bbs_article_snapshot_files.sequence](#bbs_article_snapshot_files). 

This is a pattern that we will continue to see in the future, so let's get 
used to it in advance.

**Properties**
  - `id`: 
  - `bbs_article_snapshot_id`: [bbs_article_snapshots.id](#bbs_article_snapshots) of the attributed article snapshot
  - `attachment_file_id`: [attachment_files.id](#attachment_files)
  - `sequence`: The order in which attachments are placed in the article snapshot.

### `bbs_article_comments`
Comments written on an article.

`bbs_article_comments` is an entity that visualizes comments written on an article.

And this comment, as in the relationship between [bbs_articles](#bbs_articles) 
and [bbs_article_snapshots](#bbs_article_snapshots), is stored in the subordinate
[bbs_article_comment_snapshots](#bbs_article_comment_snapshots) for evidentialism, and a new snapshot 
record is issued whenever a comment is modified.

In addition, the relationship between replies is expressed through the 
[bbs_article_comments.parent_id](#bbs_article_comments) property.

**Properties**
  - `id`: 
  - `bbs_article_id`: [bbs_articles.id](#bbs_articles) of the attached article.
  - `parent_id`
    > The ID of the parent comment.
    > 
    > Used when writing a reply.
  - `type`: The type of subtype.
  - `created_at`: Comment creation date and time.
  - `deleted_at`: Comment deletion date and time.

### `bbs_article_comment_snapshots`
Comment snapshots.

`bbs_article_comment_snapshots` is a snapshot entity that contains 
the main content of the comment.

As explained in [bbs_article_comments](#bbs_article_comments) above, to prevent undercutting.

**Properties**
  - `id`: 
  - `bbs_article_comment_id`: [bbs_article_comments.id](#bbs_article_comments) of the comment on the attached article.
  - `format`
    > Format of the body.
    > 
    > Similar meanings of extensions: html, md, txt, etc.
  - `body`: Comment body.
  - `created_at`: Record creation date and time (when the comment was first created or edited)

### `bbs_article_comment_snapshot_files`
Attachments to comment snapshots.

[bbs_article_comment_snapshots](#bbs_article_comment_snapshots) [attachment_files](#attachment_files)

M: N relationship resolution.

**Properties**
  - `id`: 
  - `bbs_article_comment_snapshot_id`: [bbs_article_comment_snapshots.id](#bbs_article_comment_snapshots) of the attributed comment snapshot
  - `attachment_file_id`: [attachment_files.id](#attachment_files)
  - `sequence`
    > Batch order.
    > 
    > The order in which the files attached to the comment snapshot are placed.

### `bbs_article_exports`

**Properties**
  - `id`: 
  - `bbs_article_snapshot_id`: [bbs_article_snapshots.id](#bbs_article_snapshots) of the attributed article snapshot
  - `provider`
    > Meaning of the name of the external service
    > 
    > For example, google_docs, notion
  - `url`: URL path to the reference
  - `created_at`: The date and time the record was created.
  - `deleted_at`: Date and time of article deletion.


## Crunchbase
```mermaid
erDiagram
"crunchbase" {
  String id PK
  String organization_identifier
  String version
  Json data
  DateTime created_at
}
```

### `crunchbase`
Get company information using the Crunchbase Rapid API.

**Properties**
  - `id`: Primary Key.
  - `organization_identifier`: Organization Identifier.
  - `version`
    > Api Version.
    > 
    > Rapid API Version.
    > We store the API version at the time of record created, as changes to the API version may affect the API.
  - `data`
    > Response Data
    > 
    > The data returned by the API.
    > Since the format of the response data depends on an external API and it is difficult to determine the type, it is saved as JSON type.
  - `created_at`: The date and time the record was created.


## Similarweb
```mermaid
erDiagram
"similarweb" {
  String id PK
  String domain UK
  String version
  Json data
  DateTime created_at
}
```

### `similarweb`
Get information using the Similarweb Rapid API.

**Properties**
  - `id`: Primary Key.
  - `domain`: The domain of the company website.
  - `version`
    > Api Version.
    > 
    > Rapid API Version.
    > We store the API version at the time of record created, as changes to the API version may affect the API.
  - `data`
    > Response Data
    > 
    > The data returned by the API.
    > Since the format of the response data depends on an external API and it is difficult to determine the type, it is saved as JSON type.
  - `created_at`: The date and time the record was created.


## X
```mermaid
erDiagram
"x_users" {
  String id PK
  String tweet_user_id UK
  String name
  String userName UK
  DateTime created_at
}
"x_tweet" {
  String id PK
  String tweet_id UK
  String x_user_id FK
  String text
  String link
  String type
  String referred_user_name "nullable"
  String referred_tweet_link "nullable"
  String referred_tweet_text "nullable"
  DateTime created_at
}
"x_tweet" }o--|| "x_users" : user
```

### `x_users`
The user information of X.

**Properties**
  - `id`: Primary Key.
  - `tweet_user_id`: Unique ID of the user in X.
  - `name`: Original name of the user.
  - `userName`: Username used like a nickname in X.
  - `created_at`: The date and time the record was created.

### `x_tweet`
The tweet information of X.

**Properties**
  - `id`: Primary Key.
  - `tweet_id`: Unique Id of the tweet in X.
  - `x_user_id`: Unique user ID of the user who posted the tweet.
  - `text`: The text of the tweet.
  - `link`: The URL of the tweet.
  - `type`: The type of the tweet.
  - `referred_user_name`: Author name of the tweet you quoted or retweeted.
  - `referred_tweet_link`: Link to the tweet you quoted or retweeted.
  - `referred_tweet_text`: Text of the tweet you quoted or retweeted.
  - `created_at`: The date and time the record was created.


## default
```mermaid
erDiagram
"slack_team" {
  String id PK
  String external_team_id
}
"slack_users" {
  String id PK
  String slack_team_id FK
  String external_user_id UK
  String status_text "nullable"
}
"slack_user_snapshots" {
  String id PK
  String slack_user_id FK
  Json fields
  String display_name "nullable"
  String real_name "nullable"
  Boolean deleted
  String profile_image "nullable"
  DateTime snapshot_at
}
"slack_last_snapshots" {
  String slack_user_id FK
  String slack_user_snapshot_id FK
}
"slack_users" }o--|| "slack_team" : slack_team
"slack_user_snapshots" }o--|| "slack_users" : slack_user
"slack_last_snapshots" |o--|| "slack_users" : slack_user
"slack_last_snapshots" |o--|| "slack_user_snapshots" : slack_user_snapshot
```

### `slack_team`

**Properties**
  - `id`: Unique ID of the team in Studio-Pro
  - `external_team_id`: Unique ID of the team in Slack

### `slack_users`

**Properties**
  - `id`: Unique ID of the user in Studio-Pro
  - `slack_team_id`: 
  - `external_user_id`: Unique ID of the user in Slack
  - `status_text`: 유저의 상태 값

### `slack_user_snapshots`

**Properties**
  - `id`: 
  - `slack_user_id`: slack_users.id를 의미한다.
  - `fields`: 슬랙 내에서 `Record<string, string>` 형태로 관리되는 여러 정보들
  - `display_name`: 
  - `real_name`: 
  - `deleted`: 
  - `profile_image`: 
  - `snapshot_at`: 마지막으로 조회한 시간을 의미하며, 데이터가 유효하다고 믿을 수 있는 마지막 시간을 의미

### `slack_last_snapshots`

**Properties**
  - `slack_user_id`: 
  - `slack_user_snapshot_id`: 