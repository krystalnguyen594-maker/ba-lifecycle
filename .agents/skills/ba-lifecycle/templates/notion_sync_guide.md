# Hướng Dẫn Đồng Bộ Deliverables Sang Notion Qua Notion MCP

Tài liệu này hướng dẫn cách Agent tự động đẩy toàn bộ tài liệu 5 Phases từ Git repo lên Notion thông qua MCP Server `notion-mcp-server`.

---

## 1. Cơ Chế Hoạt Động (How it works)

Sau khi hoàn thành 5 tài liệu trong `initiatives/<initiative_slug>/`:
1. Agent đọc nội dung các file Markdown:
   - `README.md`
   - `01_discovery_scoping.md`
   - `02_elicitation_grill.md`
   - `03_analysis_modeling.md`
   - `04_delivery_verification.md`
   - `05_solution_evaluation.md`
2. Agent hỏi người dùng (BA) ID của Notion Parent Page hoặc Parent Database (nếu chưa có sẵn cấu hình).
3. Agent gọi tool `call_mcp_tool` với server `notion-mcp-server`:
   - Sử dụng tool `API-post-page` để tạo Page cha (Initiative Hub) dưới Parent Page đã chỉ định.
   - Tiếp tục tạo các Sub-pages tương ứng với từng Phase hoặc cập nhật nội dung block bằng `API-patch-block-children`.
4. Trả về liên kết (URL) của trang Notion đã tạo để BA có thể chia sẻ ngay cho Sếp, Khách hàng hoặc Dev team.

---

## 2. Các Lệnh Notion MCP Cốt Lõi

### Tạo Trang Cha (Create Parent Initiative Page):
```json
{
  "ServerName": "notion-mcp-server",
  "ToolName": "API-post-page",
  "Arguments": {
    "parent": {
      "page_id": "<TARGET_PARENT_PAGE_ID>"
    },
    "properties": {
      "title": [
        {
          "type": "text",
          "text": {
            "content": "🚀 [Initiative] Dynamic Cashback & Gamification"
          }
        }
      ]
    }
  }
}
```

### Thêm Nội Dung Các Block (Append Blocks via API-patch-block-children):
```json
{
  "ServerName": "notion-mcp-server",
  "ToolName": "API-patch-block-children",
  "Arguments": {
    "block_id": "<CREATED_PAGE_ID>",
    "children": [
      {
        "object": "block",
        "type": "heading_2",
        "heading_2": {
          "rich_text": [{ "type": "text", "text": { "content": "1. Problem Statement & BACCM" } }]
        }
      },
      {
        "object": "block",
        "type": "paragraph",
        "paragraph": {
          "rich_text": [{ "type": "text", "text": { "content": "Chi tiết đặc tả xem trong repository..." } }]
        }
      }
    ]
  }
}
```

---

## 3. Lợi Ích Của Mô Hình Kết Hợp Git + Notion
- **Dành cho BA / Tech Lead**: Kiểm soát phiên bản chặt chẽ trong Git (Branching, Pull Request, Commit History, Diff so sánh khi có Change Request).
- **Dành cho Business / PO / Sếp / Khách hàng**: Trải nghiệm đọc tài liệu mượt mà, trực quan, có thể comment/tag người liên quan trực tiếp trên giao diện Notion.
