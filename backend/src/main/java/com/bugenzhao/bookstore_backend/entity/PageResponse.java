package com.bugenzhao.bookstore_backend.entity;

import java.util.List;

import lombok.*;

@Data
@AllArgsConstructor
public class PageResponse<T> {
    private List<T> data;
    private Long total;
}
