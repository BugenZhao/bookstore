package com.bugenzhao.bookstore_backend.entity;

import java.util.List;

import lombok.*;

@Data
@AllArgsConstructor
public class PagingResponse<T> {
    private List<T> data;
    private Long total;
}
