const { strCalculateVolumePerPrice } = require('./general')

const HELP_MESSAGE = {
  "type": "bubble",
  "body": {
    "type": "box",
    "layout": "vertical",
    "contents": [
      {
        "type": "text",
        "text": "Good Buy",
        "weight": "bold",
        "color": "#1DB446",
        "size": "sm"
      },
      {
        "type": "text",
        "text": "Help",
        "weight": "bold",
        "size": "xxl",
        "margin": "md"
      },
      {
        "type": "separator",
        "margin": "xxl"
      },
      {
        "type": "box",
        "layout": "vertical",
        "margin": "xxl",
        "spacing": "sm",
        "contents": [
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "text",
                "text": "ดูคีย์ว่ามีอะไรให้ใช้บ้าง",
                "size": "sm",
                "color": "#555555",
                "flex": 0
              },
              {
                "type": "text",
                "text": "help",
                "size": "sm",
                "color": "#111111",
                "align": "end",
                "weight": "bold"
              }
            ]
          },
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "text",
                "text": "แสดงไอเทมทั้งหมดที่จะเปรียบเทียบ",
                "size": "sm",
                "color": "#555555",
                "flex": 0
              },
              {
                "type": "text",
                "text": "ls",
                "size": "sm",
                "color": "#111111",
                "align": "end",
                "weight": "bold"
              }
            ]
          },
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "text",
                "text": "เคลียร์ไอเทมที่อยู่ในรายการ",
                "size": "sm",
                "color": "#555555",
                "flex": 0
              },
              {
                "type": "text",
                "text": "clear",
                "size": "sm",
                "color": "#111111",
                "align": "end",
                "weight": "bold"
              }
            ]
          },
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "text",
                "size": "sm",
                "color": "#555555",
                "text": "เพิ่มไอเทม",
                "flex": 0
              }
            ]
          },
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "text",
                "text": "unit,volume,price,measurement",
                "size": "sm",
                "color": "#555555",
                "flex": 0,
                "weight": "bold"
              }
            ]
          },
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "text",
                "text": "ลบไอเทม",
                "size": "sm",
                "color": "#555555",
                "flex": 0
              },
              {
                "type": "text",
                "text": "rm:อันที่ เช่น rm:1",
                "size": "sm",
                "color": "#111111",
                "align": "end",
                "weight": "bold"
              }
            ]
          }
        ]
      }
    ]
  },
  "styles": {
    "footer": {
      "separator": true
    }
  }
}

const LIST_ITEMS = (items) => {
  const contents = items.map((item, index) => {
    const { unit, volume, measurement, price } = item

    return {
      "type": "bubble",
      "body": {
        "type": "box",
        "layout": "vertical",
        "spacing": "sm",
        "contents": [
          {
            "type": "text",
            "text": `Item ${index + 1}`,
            "wrap": true,
            "weight": "bold",
            "size": "xl"
          },
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "text",
                "wrap": true,
                "size": "sm",
                "text": "จำนวน",
                "color": "#555555"
              },
              {
                "type": "text",
                "text": `${new Intl.NumberFormat('th-TH').format(unit)} ชิ้น`,
                "wrap": true,
                "weight": "bold",
                "size": "sm",
                "color": "#555555",
                "flex": 0
              }
            ]
          },
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "text",
                "wrap": true,
                "size": "sm",
                "text": "ปริมาตร / ชิ้น",
                "color": "#555555"
              },
              {
                "type": "text",
                "text": `${new Intl.NumberFormat('th-TH').format(volume)} ${measurement}`,
                "wrap": true,
                "weight": "bold",
                "size": "sm",
                "color": "#555555",
                "flex": 0
              }
            ]
          },
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "text",
                "wrap": true,
                "size": "sm",
                "text": "ราคา",
                "color": "#555555"
              },
              {
                "type": "text",
                "text": `${new Intl.NumberFormat('th-TH').format(price)} บาท`,
                "wrap": true,
                "weight": "bold",
                "size": "sm",
                "color": "#555555",
                "flex": 0
              }
            ]
          },
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "text",
                "wrap": true,
                "size": "sm",
                "text": "เฉลี่ยราคา / ต่อปริมาตร",
                "color": "#555555"
              },
              {
                "type": "text",
                "text": `${strCalculateVolumePerPrice({ item })}`,
                "wrap": true,
                "weight": "bold",
                "size": "sm",
                "color": "#555555",
                "flex": 0
              }
            ]
          }
        ]
      },
      "footer": {
        "type": "box",
        "layout": "vertical",
        "spacing": "sm",
        "contents": [
          {
            "type": "button",
            "style": "primary",
            "action": {
              "type": "message",
              "label": "ลบตัวเลือกนี้",
              "text": `rm:${index + 1}`
            },
            "color": "#dc004e"
          }
        ]
      }
    }
  })

  return {
    "type": "carousel",
    "contents": contents
  }
}

const COMPARE_RESULT = ({ item, index }) => {
  const { unit, measurement, volume, price } = item

  return {
    "type": "bubble",
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "Good Buy",
          "weight": "bold",
          "color": "#1DB446",
          "size": "sm"
        },
        {
          "type": "text",
          "text": `Item ${index + 1}`,
          "weight": "bold",
          "size": "xxl",
          "margin": "md"
        },
        {
          "type": "separator",
          "margin": "xxl"
        },
        {
          "type": "box",
          "layout": "vertical",
          "margin": "xxl",
          "spacing": "sm",
          "contents": [
            {
              "type": "box",
              "layout": "horizontal",
              "contents": [
                {
                  "type": "text",
                  "text": "จำนวน",
                  "size": "sm",
                  "color": "#555555",
                  "flex": 0
                },
                {
                  "type": "text",
                  "text": `${new Intl.NumberFormat('th-TH').format(unit)} ชิ้น`,
                  "size": "sm",
                  "color": "#555555",
                  "align": "end",
                  "weight": "bold"
                }
              ]
            },
            {
              "type": "box",
              "layout": "horizontal",
              "contents": [
                {
                  "type": "text",
                  "text": "ปริมาตร / ชิ้น",
                  "size": "sm",
                  "color": "#555555",
                  "flex": 0
                },
                {
                  "type": "text",
                  "text": `${new Intl.NumberFormat('th-TH').format(volume)} ${measurement}`,
                  "size": "sm",
                  "color": "#555555",
                  "align": "end",
                  "weight": "bold"
                }
              ]
            },
            {
              "type": "box",
              "layout": "horizontal",
              "contents": [
                {
                  "type": "text",
                  "text": "ราคา",
                  "size": "sm",
                  "color": "#555555",
                  "flex": 0
                },
                {
                  "type": "text",
                  "text": `${new Intl.NumberFormat('th-TH').format(price)} บาท`,
                  "size": "sm",
                  "color": "#555555",
                  "align": "end",
                  "weight": "bold"
                }
              ]
            },
            {
              "type": "box",
              "layout": "horizontal",
              "contents": [
                {
                  "type": "text",
                  "text": "เฉลี่ยราคา / ต่อปริมาตร",
                  "size": "sm",
                  "color": "#555555",
                  "flex": 0
                },
                {
                  "type": "text",
                  "text": `${strCalculateVolumePerPrice({ item })}`,
                  "size": "sm",
                  "color": "#555555",
                  "align": "end",
                  "weight": "bold"
                }
              ]
            }
          ]
        },
        {
          "type": "separator",
          "margin": "xxl"
        },
        {
          "type": "box",
          "layout": "horizontal",
          "margin": "md",
          "contents": [
            {
              "type": "text",
              "text": "ราคาถูกที่สุด",
              "color": "#1DB446",
              "size": "lg",
              "align": "end",
              "style": "normal",
              "weight": "bold"
            }
          ]
        }
      ]
    },
    "styles": {
      "footer": {
        "separator": true
      }
    }
  }
}

module.exports = {
  HELP_MESSAGE,
  LIST_ITEMS,
  COMPARE_RESULT
}
