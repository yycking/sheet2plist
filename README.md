# sheet2plist
Convert Google Sheet to Property list

## Source Format (Google Sheet)
| intValue:Int | stringValue:String | series:Product | powerSources:[PowerSource] | useEventStatck:Bool |
| ------------ | ------------------ | -------------- | -------------------------- | ------------------- |
| 2            | ot-talk-v1         | otTalkV1       | 電池                         | TRUE                |
| 3            | ot-talk-v2         | ot-talk-v1     | 電池                         | FALSE               |
| 9            | ot-talk-plus       | ot-talk-v1     | 電池                         | FALSE               |
| 10           | ot-controller      | ot-controller  | 變壓器                        | TRUE                |
| 12           | ot-pad             | ot-pad         | 變壓器                        | FALSE               |
				
## Result Format (Property list)
